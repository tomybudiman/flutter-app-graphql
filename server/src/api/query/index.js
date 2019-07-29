const {GraphQLObjectType} = require("graphql");

const userQuery = require("./user");
const authQuery = require("./auth");

module.exports = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    ...userQuery,
    ...authQuery
  }
});
