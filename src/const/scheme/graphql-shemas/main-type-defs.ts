import { authTypeDefs } from "#src/const/scheme/graphql-shemas/auth-type-defs.js";
import { cartTypeDefs } from "#src/const/scheme/graphql-shemas/cart-type-defs.js";
import { orderTypeDefs } from "#src/const/scheme/graphql-shemas/order-type-defs.js";
import { productTypeDefs } from "#src/const/scheme/graphql-shemas/product-type-defs.js";
import { userTypeDefs } from "#src/const/scheme/graphql-shemas/user-type-defs.js";

const baseTypeDefs = `#graphql
    type Query{
        _empty: String
    }

    type Mutation{
        _empty: String
    }
`;

export const typeDefs = [
  baseTypeDefs,
  authTypeDefs,
  cartTypeDefs,
  orderTypeDefs,
  productTypeDefs,
  userTypeDefs,
];
