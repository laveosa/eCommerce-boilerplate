export const authTypeDefs = `#graphql
    type Auth {
        id: ID!
        name: String!
        email: String!
        password: String!
    }

    input AuthInput {
        id: ID!
        name: String!
        email: String!
        password: String!
    }

    extend type Mutation {
        signIn(data: AuthInput!): User!
        register(data: AuthInput!): User!
    }
`;
