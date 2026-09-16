export const orderTypeDefs = `#graphql
  type Order {
    id: ID!
    user: User!
    cart: Cart!
    registerDate: String
    address: String
  }
  
  input OrderInput {
    id: ID
    userId: ID!
    cartId: ID!
    registerDate: String
    address: String
  }
  
  extend type Query {
      orders: [Order!]!
      order: Order!
      orderByUserId: Order!
  }
  
  extend type Mutation {
      addOrders(data: [OrderInput!]!): [Order!]!
      addOrder(data: OrderInput!): Order!
      updateOrder(data: OrderInput!): Order!
      deleteOrder(id: ID!): Order!
      addCartToOrder(cartId: String!, orderId: String!, UserId: String!,): Order!
      removeCartFromOrder(cartId: String!, orderId: String!): Order!
  }
`;
