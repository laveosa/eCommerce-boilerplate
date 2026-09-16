export const userTypeDefs = `#graphql
  enum Role {
      GUEST
      USER
      ADMIN
      DEV
  }
  
  enum UserStatus {
      ACTIVE
      INACTIVE
      PENDING
      BLOCKED
  }

  type User {
      id: ID!
      name: String!
      email: String!
      password: String!
      address: String!
      role: Role!
      status: UserStatus!
  }
  
  input UserInput {
      id: ID
      name: String!
      email: String!
      password: String!
      address: String!
      role: Role!
      status: UserStatus!
  }
  
  extend type Query {
      users: [User!]!
      user(id: ID!): User!
  }
  
  extend type Mutation {
      addUsers(data: [UserInput!]!): [User!]!
      addUser(data: UserInput!): User!
      updateUser(data: UserInput!): User!
      updateUserName(id: ID!, value: String!): Boolean!
      updateUserAddress(id: ID!, value: String!): Boolean!
      updateUserPassword(id: ID!, value: String!): Boolean!
      deleteUser(id: ID!): User!
  }
`;
