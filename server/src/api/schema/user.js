const {
  GraphQLString,
  GraphQLBoolean,
  GraphQLObjectType
} = require("graphql");

const UserType = new GraphQLObjectType({
  name: "User",
  fields: {
    _id: {type: GraphQLString},
    firstName: {type: GraphQLString},
    lastName: {type: GraphQLString},
    email: {type: GraphQLString},
    dob: {type: GraphQLString},
    role: {type: GraphQLString},
    isVerified: {type: GraphQLBoolean}
  }
});

const CreateUserType = new GraphQLObjectType({
  name: "CreateNewUser",
  fields: {
    status: {type: GraphQLBoolean}
  }
})

module.exports = {UserType, CreateUserType};
