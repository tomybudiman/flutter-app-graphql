const {
  GraphQLString
} = require("graphql");
const {isEmpty} = require("lodash");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const fs = require("fs");

const {RequestChangePassword} = require("../schema");
const {User} = require("../../models");

const privateKey = fs.readFileSync("./src/key/private.key", "utf8");
const publicKey = fs.readFileSync("./src/key/public.key", "utf8");
const jwtOptions = {
  expiresIn: process.env.JWT_AUTH_DURATION,
  issuer: process.env.JWT_ISSUER,
  subject: process.env.JWT_SUBJECT,
  algorithm: process.env.JWT_ALGORITHM
}

const requestChangePassword = {
  type: RequestChangePassword,
  args: {
    id: {type: GraphQLString},
    email: {type: GraphQLString},
    type: {type: GraphQLString}
  },
  resolve: async (_, args) => {
    try{
      const allowedType = ["reset", "update"];
      const checkUser = await new Promise((resolve, reject) => {
        if(!args.type || !allowedType.includes(args.type)){
          console.error("Invalid change password type.");
          reject(new Error("ILLEGAL_ARGUMENT"));
        }
        if(!isEmpty(args.id)){ // Prioritize using ID
          User.findById(args.id).then(res => {
            res ? resolve({status: true, data: res}) : reject(new Error("NOT_FOUND"));
          }).catch(err => new Error("SERVER_ERROR"));
        }else if(!isEmpty(args.email)){
          User.find({email: args.email}).then(res => {
            res.length > 0 ? resolve({status: true, data: res[0]}) : reject(new Error("NOT_FOUND"));
          }).catch(err => {
            console.error(err);
            reject(new Error("SERVER_ERROR"));
          });
        }else{
          reject(new Error("NOT_FOUND"));
        }
      });
      const generateToken = await new Promise((resolve, reject) => {
        if(checkUser.status){
          const {_id, email, firstName, lastName} = checkUser.data;
          const requestTime = moment().format();
          const jwtObj = {id: _id, type: args.type, email, firstName, lastName, requestTime};
          const token = jwt.sign(jwtObj, privateKey, jwtOptions);
          resolve({token, requestTime, validity: moment().add(parseFloat(process.env.JWT_AUTH_DURATION), "h").format()});
        }else{
          reject(new Error("NOT_FOUND"));
        }
      });
      return generateToken
    }catch(err){
      throw err
    }
  }
}

module.exports = {requestChangePassword};
