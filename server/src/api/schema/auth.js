const {
  GraphQLString,
  GraphQLBoolean,
  GraphQLObjectType
} = require("graphql");

const LoginType = new GraphQLObjectType({
  name: "Login",
  fields: {
    token: {type: GraphQLString},
    loginTime: {type: GraphQLString}
  }
});

const RequestChangePassword = new GraphQLObjectType({
  name: "RequestChangePassword",
  fields: {
    token: {type: GraphQLString},
    validity: {type: GraphQLString},
    requestTime: {type: GraphQLString}
  }
});

const ChangePassword = new GraphQLObjectType({
  name: "ChangePassword",
  fields: {
    status: {type: GraphQLBoolean}
  }
});

module.exports = {LoginType, RequestChangePassword, ChangePassword};
