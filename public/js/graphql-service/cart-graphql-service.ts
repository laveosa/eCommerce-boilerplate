import axios from "axios";

import { productQuery } from "#public/js/graphql-service/product-graphql-service.js";
import { userQuery } from "#public/js/graphql-service/user-graphql-service.js";
import type { CartModel } from "#src/const/model/CartModel.js";

const GRAPHQL_URL = "/graphql";
export const cartQuery = `
  id
  userId
  user {
    ${userQuery}
  }
  products {
    ${productQuery}
  }
  registerDate
  totalItems
  totalPrice
`;

async function graphqlRequest<T>(
  query: string,
  variables?: Record<string, any>,
): Promise<T> {
  const response = await axios.post(GRAPHQL_URL, {
    query,
    variables,
  });

  if (response.data.errors && response.data.errors.length > 0) {
    throw new Error(
      response.data.errors[0].message || "[GRAPHQL_ERROR]: Operation failed",
    );
  }

  return response.data.data;
}

export class CartGraphqlService {
  // --------------------------------------------- CRUD
  static async getAllCarts(): Promise<CartModel[]> {
    const query = `
      query GetAllCarts {
        carts {
          ${cartQuery}
        }
      }
    `;

    try {
      const data = await graphqlRequest<{ carts: CartModel[] }>(query);
      return data.carts;
    } catch (error: any) {
      console.error("[API ERROR]: Failed to fetch carts", error.message);
      throw error;
    }
  }

  static async getCart(id: string): Promise<CartModel> {
    const query = `
      query GetCart($id: ID!) {
        cart(id: $id) {
          ${cartQuery}
        }
      }
    `;

    try {
      const data = await graphqlRequest<{ cart: CartModel }>(query, { id });
      return data.cart;
    } catch (error: any) {
      console.error("[API ERROR]: Failed to fetch cart", error.message);
      throw error;
    }
  }

  static async addCart(cartData: CartModel): Promise<CartModel> {
    const query = `
      mutation AddCart($data: CartInput!) {
        addCart(data: $data) {
          ${cartQuery}
        }
      }
    `;

    try {
      const data = await graphqlRequest<{ addCart: CartModel }>(query, {
        data: cartData,
      });
      return data.addCart;
    } catch (error: any) {
      console.error("[API ERROR]: Failed to add cart", error.message);
      throw error;
    }
  }

  static async setAllCarts(carts: CartModel[]): Promise<CartModel[]> {
    const query = `
      mutation SetAllCarts($data: [CartInput!]!) {
        setAllCarts(data: $data) {
          ${cartQuery}
        }
      }
    `;

    try {
      const data = await graphqlRequest<{ setAllCarts: CartModel[] }>(query, {
        data: carts,
      });
      return data.setAllCarts;
    } catch (error: any) {
      console.error("[API ERROR]: Failed to set all carts", error.message);
      throw error;
    }
  }

  static async updateCart(cartData: CartModel): Promise<CartModel> {
    const query = `
      mutation UpdateCart($data: CartInput!) {
        updateCart(data: $data) {
          ${cartQuery}
        }
      }
    `;

    try {
      const data = await graphqlRequest<{ updateCart: CartModel }>(query, {
        data: cartData,
      });
      return data.updateCart;
    } catch (error: any) {
      console.error("[API ERROR]: Failed to update cart", error.message);
      throw error;
    }
  }

  static async deleteCart(id: string): Promise<CartModel> {
    const query = `
      mutation DeleteCart($id: ID!) {
        deleteCart(id: $id) {
          ${cartQuery}
        }
      }
    `;

    try {
      const data = await graphqlRequest<{ deleteCart: CartModel }>(query, {
        id,
      });
      return data.deleteCart;
    } catch (error: any) {
      console.error("[API ERROR]: Failed to delete cart", error.message);
      throw error;
    }
  }

  // --------------------------------------------- EXTRA

  static async getCartByUserId(userId: string): Promise<CartModel> {
    const query = `
      query GetCartByUserId($userId: ID!) {
        cartByUserId(userId: $userId) {
          ${cartQuery}
        }
      }
    `;

    try {
      const data = await graphqlRequest<{ cartByUserId: CartModel }>(query, {
        userId,
      });
      return data.cartByUserId;
    } catch (error: any) {
      console.error(
        "[API ERROR]: Failed to fetch cart by user ID",
        error.message,
      );
      throw error;
    }
  }

  static async addProductToCart(
    productId: string,
    cartId: string,
    userId: string,
  ): Promise<CartModel> {
    const query = `
      mutation AddProductToCart($productId: ID!, $cartId: ID, $userId: ID!) {
        addProductToCart(productId: $productId, cartId: $cartId, userId: $userId) {
          ${cartQuery}
        }
      }
    `;

    try {
      const data = await graphqlRequest<{ addProductToCart: CartModel }>(
        query,
        {
          productId,
          cartId,
          userId,
        },
      );
      return data.addProductToCart;
    } catch (error: any) {
      console.error(
        "[API ERROR]: Failed to add product to cart",
        error.message,
      );
      throw error;
    }
  }

  static async removeProductFromCart(
    productId: string,
    cartId: string,
  ): Promise<CartModel> {
    const query = `
      mutation RemoveProductFromCart($productId: ID!, $cartId: ID!) {
        removeProductFromCart(productId: $productId, cartId: $cartId) {
          ${cartQuery}
        }
      }
    `;

    try {
      const data = await graphqlRequest<{ removeProductFromCart: CartModel }>(
        query,
        {
          productId,
          cartId,
        },
      );
      return data.removeProductFromCart;
    } catch (error: any) {
      console.error(
        "[API ERROR]: Failed to remove product from cart",
        error.message,
      );
      throw error;
    }
  }
}
