const graphql = require('graphql');
const { GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLString } = graphql;

import { UserType, encryptPassword, decrypPassword } from './user-type';
import CommentType from './comment-type';
import Db from '../models/model';
import { uploadStream, showBlobNames } from '../azure_files';
import getEmotionImage from '../azure_face';

const RootQuery = new GraphQLObjectType({
  name: 'queries',
  description: 'Services Azure and DB-MySQL',
  fields: () => {
    return {
      users: {
        name: 'get All Users',
        description: 'Find all user in db',
        type: GraphQLList(UserType),
        resolve(root, args) {
          return Db.models.user.findAll();
        }
      },
      testQuery: {
        name: 'test',
        description: 'TEST',
        type: GraphQLString,
        resolve(root, args) {
          return 'prueba de Graphql';
        }
      },
      comments: {
        name: 'get All Comments',
        description: 'Find all user in db',
        type: GraphQLList(CommentType),
        resolve(root, args) {
          return Db.models.comment.findAll();
        }
      },
      addImage: {
        name: 'upload Image to Azure',
        description: 'Upload file image to Azure Blob',
        type: GraphQLString,
        args: {
          image: { type: new GraphQLNonNull(GraphQLString) }
        },
        resolve(root, args) {
          return uploadStream(args.image)
        }
      },
      getEmotion: {
        name: 'get Emotion from Image',
        description: 'Get Emotions-Face from URL Image - Azure Files',
        type: GraphQLString,
        args: {
          image: { type: new GraphQLNonNull(GraphQLString) }
        },
        resolve(root, args) {
          return getEmotionImage(args.image)
        }
      }
    }
  }
});

const CreateUser = {
  createUser: {
    name: 'createUser',
    description: 'Insert new user in database',
    type: UserType,
    args: {
      firstName: { type: new GraphQLNonNull(GraphQLString) },
      lastName: { type: new GraphQLNonNull(GraphQLString) },
      email: { type: new GraphQLNonNull(GraphQLString) },
      password: { type: new GraphQLNonNull(GraphQLString) },
      userName: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve(root, args) {
      return Db.models.user.create({ firstName: args.flower, lastName: args.lastName, email: args.email, password: encryptPassword(args.password), userName: args.userName })
    }
  }
};


const DeleteUser = {
  deleteUser: {
    name: 'deleteUser',
    description: 'Delete user in database',
    type: UserType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLInt) }
    },
    resolve(root, args) {
      return Db.models.user.destroy({ where: { idUser: args.id } })
    }
  }
};

const UpdateUser = {
  updateUser: {
    name: 'updateUser',
    description: 'Update user in database',
    type: UserType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLInt) },
      firstName: { type: new GraphQLNonNull(GraphQLString) },
      lastName: { type: new GraphQLNonNull(GraphQLString) },
      email: { type: new GraphQLNonNull(GraphQLString) },
      password: { type: new GraphQLNonNull(GraphQLString) },
      userName: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve(root, args) {
      return Db.models.user.update({ firstName: args.flower, lastName: args.lastName, email: args.email, password: args.password, userName: args.userName },
        {
          where: { idUser: args.id }
        })
    }
  }
};

const ReadUser = {
  readUser: {
    name: 'readUser',
    description: 'FindOne user in database',
    type: new GraphQLList(UserType),
    args: {
      id: { type: new GraphQLNonNull(GraphQLInt) }
    },
    resolve(root, args) {
      return Db.models.user.findAll({ where: { idUser: args.id } })
    }
  }
}


const CreateComment = {
  createComment: {
    name: 'createComment',
    description: 'Insert new comment in database',
    type: CommentType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLString) },
      comment: { type: new GraphQLNonNull(GraphQLString) },
      urlPhoto: { type: new GraphQLNonNull(GraphQLString) },
      emotion: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve(root, args) {
      return Db.models.comment.create({ idUser: args.id, comment: args.comment, urlPhoto: args.urlPhoto, emotion: args.emotion })
    }
  }
};


const DeleteComment = {
  deleteComment: {
    name: 'deleteComment',
    description: 'Delete comment in database',
    type: CommentType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLInt) }
    },
    resolve(root, args) {
      return Db.models.comment.destroy({ where: { idComment: args.id } })
    }
  }
};

const UpdateComment = {
  updateComment: {
    name: 'updateComment',
    description: 'Update comment in database',
    type: CommentType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLInt) },
      comment: { type: new GraphQLNonNull(GraphQLString) },
      urlPhoto: { type: new GraphQLNonNull(GraphQLString) },
      emotion: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve(root, args) {
      return Db.models.comment.update({ comment: args.comment, urlPhoto: args.urlPhoto, emotion: args.emotion },
        {
          where: { idComment: args.id }
        })
    }
  }
};

const ReadComment = {
  readComment: {
    name: 'readComment',
    description: 'FindOne comment in database',
    type: new GraphQLList(CommentType),
    args: {
      id: { type: new GraphQLNonNull(GraphQLInt) }
    },
    resolve(root, args) {
      return Db.models.comment.findAll({ where: { idComment: args.id } })
    }
  }
}


const RootMutation = new GraphQLObjectType({
  name: 'CRUD',
  description: 'CRUD: Create, Read,Update, Delete in DataBase MySQL',
  fields: () => ({
    ...CreateUser,
    ...ReadUser,
    ...UpdateUser,
    ...DeleteUser,
    ...CreateComment,
    ...ReadComment,
    ...UpdateComment,
    ...DeleteComment
  })
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
}); 
