import { authResolver } from "#src/resolvers/auth-resolver.js";
import { cartResolver } from "#src/resolvers/cart-resolver.js";
import { orderResolver } from "#src/resolvers/order-resolver.js";
import { productResolver } from "#src/resolvers/product-resolver.js";
import { userResolver } from "#src/resolvers/user-resolver.js";

export const resolvers = {
  Query: {
    ...cartResolver.Query,
    ...orderResolver.Order,
    ...productResolver.Query,
    ...userResolver.Query,
  },
  Mutation: {
    ...authResolver.Mutation,
    ...cartResolver.Mutation,
    ...orderResolver.Mutation,
    ...productResolver.Mutation,
    ...userResolver.Mutation,
  },
  Cart: cartResolver.Cart,
  Order: orderResolver.Order,
};
