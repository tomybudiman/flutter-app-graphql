const {
  GraphQLInt,
  GraphQLList,
  GraphQLBoolean,
  GraphQLObjectType
} = require("graphql");

class PaginationType {
  constructor(customType){
    return new GraphQLObjectType({
      name: "Pagination",
      fields: () => {
        return {
          docs: {type: new GraphQLList(customType)},
          totalDocs: {type: GraphQLInt},
          limit: {type: GraphQLInt},
          hasPrevPage: {type: GraphQLBoolean},
          hasNextPage: {type: GraphQLBoolean},
          page: {type: GraphQLInt},
          totalPages: {type: GraphQLInt},
          pagingCounter: {type: GraphQLInt},
          prevPage: {type: GraphQLInt},
          nextPage: {type: GraphQLInt}
        }
      }
    });
  }
}

module.exports = {PaginationType};
