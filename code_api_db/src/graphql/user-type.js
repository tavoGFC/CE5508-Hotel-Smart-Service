const graphql = require('graphql');
const { GraphQLInt, GraphQLObjectType, GraphQLString } = graphql;

import SimpleCrypto from 'simple-crypto-js';

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => {
    return {
      id: {
        type: GraphQLInt,
        resolve(user) {
          return user.id
        }
      },
      firstName: {
        type: GraphQLString,
        resolve(user) {
          return user.firstName
        }
      },
      lastName: {
        type: GraphQLString,
        resolve(user) {
          return user.lastName
        }
      },
      email: {
        type: GraphQLString,
        resolve(user) {
          return user.email
        }
      },
      password: {
        type: GraphQLString,
        resolve(user) {
          return user.password
        }
      },
      userName: {
        type: GraphQLString,
        resolve(user) {
          return user.userName
        }
      }
    }
  }
});

async function encryptPassword(password) {
  const simpleCrypto = new SimpleCrypto('cehssAPP');
  const passwordEncrypt = simpleCrypto.encrypt(password);
  return passwordEncrypt;
}

async function decrypPassword(password) {
  const simpleCrypto = new SimpleCrypto('cehssAPP');
  const passwordDecrypt = simpleCrypto.decrypt(password);
  return passwordDecrypt;
}
export { UserType, encryptPassword, decrypPassword };
