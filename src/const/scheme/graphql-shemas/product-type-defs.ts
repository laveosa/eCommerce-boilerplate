export const productTypeDefs = `#graphql
  type Product {
      id: ID!
      title: String!
      imageUrl: String!
      description: String!
      price: Int!
      quantity: Int
      inCart: Boolean
  }
  
  input ProductInput {
      id: ID
      title: String!
      imageUrl: String
      description: String!
      price: Int!
      quantity: Int
      inCart: Boolean
  }
  
  extend type Query {
      products: [Product!]!
      product: Product!
  }
  
  extend type Mutation {
      addProducts(data: [ProductInput!]!): [Product!]!
      addProduct(data: ProductInput!): Product!
      updateProduct(data: ProductInput!): Product!
      deleteProduct(id: ID!): Product!
      deleteProducts(data: [ProductInput!]!): [Product!]!
  }
`;
