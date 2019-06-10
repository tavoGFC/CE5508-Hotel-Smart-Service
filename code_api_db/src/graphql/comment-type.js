const graphql = require('graphql');
const { GraphQLInt, GraphQLObjectType, GraphQLString } = graphql;


const CommentType = new GraphQLObjectType({
  name: 'Comment',
  fields: () => {
    return {
      id: {
        type: GraphQLInt,
        resolve(comment) {
          return comment.id
        }
      },
      idUser: {
        type: GraphQLInt,
        resolve(comment) {
          return comment.idUser
        }
      },
      comment: {
        type: GraphQLString,
        resolve(comment) {
          return comment.comment
        }
      },
      urlPhoto: {
        type: GraphQLString,
        resolve(comment) {
          return comment.urlPhoto
        }
      },
      emotion: {
        type: GraphQLString,
        resolve(comment) {
          return comment.emotion
        }
      }
    }
  }
});

export default CommentType;
