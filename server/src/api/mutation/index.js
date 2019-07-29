const {GraphQLObjectType} = require("graphql");

const userMutation = require("./user");
const authMutation = require("./auth");

module.exports = new GraphQLObjectType({
  name: "RootMutation",
  fields: {
    ...userMutation,
    ...authMutation
  }
});
