const {
  GraphQLInt,
  GraphQLList,
  GraphQLString,
  GraphQLObjectType
} = require("graphql");
const {isEmpty} = require("lodash");

const {UserType, PaginationType} = require("../schema");
const {User} = require("../../models");

const user = {
  type: UserType,
  args: {
    id: {type: GraphQLString},
    email: {type: GraphQLString}
  },
  resolve: async (_, args) => {
    try{
      const user = await new Promise((resolve, reject) => {
        if(!isEmpty(args.id)){ // Prioritize using ID
          User.findById(args.id).then(res => {
            res ? resolve(res) : reject(new Error("NOT_FOUND"));
          }).catch(err => new Error("SERVER_ERROR"));
        }else if(!isEmpty(args.email)){
          User.find({email: args.email}).then(res => {
            res.length > 0 ? resolve(res[0]) : reject(new Error("NOT_FOUND"));
          }).catch(err => {
            console.error(err);
            reject(new Error("SERVER_ERROR"));
          });
        }else{
          reject(new Error("NOT_FOUND"));
        }
      });
      return user
    }catch(err){
      throw err
    }
  }
};

const users = {
  type: new PaginationType(UserType),
  args: {
    limit: {type: GraphQLInt},
    page: {
      type: GraphQLInt,
      defaultValue: 1
    }
  },
  resolve: async (_, args) => {
    try{
      const users = await new Promise((resolve, reject) => {
        User.paginate({}, args).then(res => {
          resolve(res);
        }).catch(err => {
          console.error(err);
          reject(new Error("SERVER_ERROR"));
        });
      });
      return users;
    }catch(err){
      throw err
    }
  }
}

module.exports = {user, users};
