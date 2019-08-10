const {
  GraphQLString
} = require("graphql");
const {isEmpty} = require("lodash");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const bcrypt = require("bcrypt");
const fs = require("fs");

const {LoginType, ChangePassword} = require("../schema");
const {User} = require("../../models");

const privateKey = fs.readFileSync("./src/key/private.key", "utf8");
const publicKey = fs.readFileSync("./src/key/public.key", "utf8");
const jwtOptions = {
  expiresIn: process.env.JWT_AUTH_DURATION,
  issuer: process.env.JWT_ISSUER,
  subject: process.env.JWT_SUBJECT,
  algorithm: process.env.JWT_ALGORITHM
};

const login = {
  type: LoginType,
  args: {
    email: {type: GraphQLString},
    password: {type: GraphQLString}
  },
  resolve: async (_, args) => {
    try{
      const checkUser = await new Promise((resolve, reject) => {
        if(!isEmpty(args.email) && !isEmpty(args.password)){
          User.find({email: args.email}).then(res => {
            res.length > 0 ? resolve({status: true, data: res[0]}) : reject(new Error("LOGIN_FAILED"));
          }).catch(err => {
            console.error(err);
            reject(new Error("SERVER_ERROR"));
          });
        }else{
          reject(new Error("LOGIN_FAILED"));
        }
      });
      const loginProcess = await new Promise((resolve, reject) => {
        if(checkUser.status){
          const {_id, email, firstName, lastName, password} = checkUser.data;
          bcrypt.compare(args.password, password, (err, res) => {
            if(err || !res){
              reject(new Error("LOGIN_FAILED"));
            }else{
              const loginTime = moment().format();
              const jwtObj = {id: _id, email, firstName, lastName, loginTime};
              const token = jwt.sign(jwtObj, privateKey, jwtOptions);
              User.updateOne({_id}, {lastLogin: loginTime}).then(res => {
                resolve({token, loginTime});
              }).catch(err => {
                console.error(err);
                reject(new Error("SERVER_ERROR"));
              });
            }
          });
        }else{
          reject(new Error("LOGIN_FAILED"));
        }
      });
      return loginProcess
    }catch(err){
      throw err
    }
  }
};

const loginVerify = {
  type: LoginType,
  args: {
    token: {type: GraphQLString},
    loginTime: {type: GraphQLString}
  },
  resolve: async (_, args) => {
    try{
      const validateTokenTime = await new Promise((resolve, reject) => {
        if(!isEmpty(args.token) && !isEmpty(args.loginTime)){
          jwt.verify(args.token, publicKey, jwtOptions, (err, decoded) => {
            if(err){
              reject(new Error("UNAUTHORIZED"));
            }else{
              const matchLoginTime = moment(decoded.loginTime).isSame(args.loginTime);
              matchLoginTime ? resolve({status: true, data: decoded}) : reject(new Error("UNAUTHORIZED"));
            }
          });
        }else{
          reject(new Error("UNAUTHORIZED"));
        }
      });
      const validateTokenData = await new Promise((resolve, reject) => {
        if(validateTokenTime.status){
          User.findOne({
            _id: validateTokenTime.data.id,
            email: validateTokenTime.data.email
          }).then(res => {
            if(res){
              const {id, email, firstName, lastName} = validateTokenTime.data;
              const loginTime = moment().format();
              const jwtObj = {id, email, firstName, lastName, loginTime};
              const token = jwt.sign(jwtObj, privateKey, jwtOptions);
              User.updateOne({_id: id}, {lastLogin: loginTime}).then(res => {
                resolve({token, loginTime});
              }).catch(err => {
                console.error(err);
                reject(new Error("SERVER_ERROR"));
              });
            }else{
              reject(new Error("UNAUTHORIZED"));
            }
          }).catch(err => {
            console.error(err);
            reject(new Error("SERVER_ERROR"));
          });
        }else{
          reject(new Error("UNAUTHORIZED"));
        }
      });
      return validateTokenData
    }catch(err){
      throw err
    }
  }
};

const resetPassword = {
  type: ChangePassword,
  args: {
    token: {type: GraphQLString},
    currentPassword: {type: GraphQLString},
    newPassword: {type: GraphQLString},
    verifyPassword: {type: GraphQLString}
  },
  resolve: async (_, args) => {
    try{
      const validateToken = await new Promise((resolve, reject) => {
        if(!isEmpty(args.token)){
          jwt.verify(args.token, publicKey, jwtOptions, (err, decoded) => {
            err ? reject(new Error("UNAUTHORIZED")) : resolve({status: true, data: decoded});
          });
        }else{
          reject(new Error("UNAUTHORIZED"));
        }
      });
      const updatePassword = await new Promise((resolve, reject) => {
        if(validateToken.status){
          const {id, email, firstName, lastName, type} = validateToken.data;
          const {currentPassword, newPassword, verifyPassword} = args;
          switch(type){
            case "reset":
            const checkIsEmpty = !isEmpty(newPassword) && !isEmpty(verifyPassword);
            const checkIsMatch = newPassword === verifyPassword;
              if(checkIsEmpty && checkIsMatch){
                bcrypt.hash(args.newPassword, 10, (err, hash) => {
                  if(err){
                    reject(new Error("SERVER_ERROR"));
                  }else{
                    User.updateOne({_id: id}, {password: hash}).then(res => {
                      resolve({status: true});
                    }).catch(err => {
                      console.error(err);
                      reject(new Error("SERVER_ERROR"));
                    });
                  }
                });
              }else{
                reject(new Error("PASSWORD_NOT_MATCH"));
              }
              break
            case "update":
              break
            default:
              reject(new Error("UNAUTHORIZED"));
              break
          }
        }else{
          reject(new Error("UNAUTHORIZED"));
        }
      });
      return updatePassword
    }catch(err){
      throw err
    }
  }
};

module.exports = {login, loginVerify, resetPassword};
