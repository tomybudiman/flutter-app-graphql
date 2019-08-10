const {
  GraphQLString
} = require("graphql");
const bcrypt = require("bcrypt");

const {CreateUserType} = require("../schema");
const {User} = require("../../models");

const createUser = {
  type: CreateUserType,
  args: {
    firstName: {type: GraphQLString},
    lastName: {type: GraphQLString},
    email: {type: GraphQLString},
    password: {type: GraphQLString},
    role: {type: GraphQLString}
  },
  resolve: async (_, args) => {
    try{
      const checkEmail = await new Promise((resolve, reject) => {
        User.find({email: args.email}).then(res => {
          if(res.length === 0){
            resolve({status: true});
          }else{
            reject(new Error("EMAIL_REGISTERED"));
          }
        }).catch(err => {
          console.error(err);
          reject(new Error("SERVER_ERROR"));
        });
      });
      const createUser = await new Promise((resolve, reject) => {
        if(checkEmail.status){
          bcrypt.hash(args.password, 10, (err, hash) => {
            if(err){
              reject(new Error("REGISTER_FAIL"));
            }else{
              User.create({...args, password: hash}).then(res => {
                resolve({status: true});
              }).catch(err => {
                console.error(err);
                reject(new Error("SERVER_ERROR"));
              });
            }
          });
        }
      });
      return createUser
    }catch(err){
      throw err
    }
  }
};

module.exports = {createUser}
