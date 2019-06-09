const graphql = require('graphql');
const { GraphQLInt, GraphQLObjectType, GraphQLString } = graphql;


const OrderType = new GraphQLObjectType({
  name: 'Order',
  fields: () => {
    return {
      id: {
        type: GraphQLInt,
        resolve(order) {
          return order.id
        }
      },
      number: {
        type: GraphQLString,
        resolve(order) {
          return order.number
        }
      },
      flower: {
        type: GraphQLString,
        resolve(order) {
          return order.flower
        }
      }
    }
  }
});

export default OrderType;
