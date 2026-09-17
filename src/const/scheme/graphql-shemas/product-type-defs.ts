export const productTypeDefs = `#graphql
    type PaginationQuery {
        current: Int
        total: Int
        prevPage: Int
        nextPage: Int
        perPage: Int
    }

    type PaginatedFilters {
        search: String
    }

    type PaginatedResult {
        data: [Product!]
        pagination: PaginationQuery!
        filters: PaginatedFilters
    }

    type Product {
      id: ID!
      title: String!
      imageUrl: String!
      description: String!
      price: Float!
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
      products(search: String, page: Int, perPage: Int): PaginatedResult!
      product(id: ID!): Product!
  }
  
  extend type Mutation {
      addProducts(data: [ProductInput!]!): [Product!]!
      addProduct(data: ProductInput!): Product!
      updateProduct(data: ProductInput!): Product!
      deleteProduct(id: ID!): Product!
      deleteProducts(data: [ProductInput!]!): [Product!]!
  }
`;
