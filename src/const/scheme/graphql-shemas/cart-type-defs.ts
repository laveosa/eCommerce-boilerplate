export const cartTypeDefs = `#graphql
  type Cart{
      id: ID!
      userId: ID!
      user: User
      registerDate: String
      products: [Product!]
      totalItems: Int
      totalPrice: Float
  }
  
  input CartInput{
      id: ID
      userId: ID
      registerDate: String
      totalItems: Int
      totalPrice: Int
  }
  
  extend type Query{
      carts: [Cart!]!
      cart: Cart!
      cartByUserId: Cart!
  }
  
  extend type Mutation{
      addCarts(data: [CartInput!]!): [Cart!]!
      addCart(data: CartInput!): Cart!
      updateCart(data: CartInput!): Cart!
      deleteCart(id: ID!): Cart!
      addProductToCart(productId: ID!, cartId: ID, userId: ID!): Cart!
      removeProductFromCart(productId: ID!, cartId: ID!): Cart!
  }
`;
