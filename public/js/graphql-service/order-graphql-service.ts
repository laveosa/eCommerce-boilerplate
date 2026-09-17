import axios from "axios";

import { userQuery } from "#public/js/graphql-service/user-graphql-service.js";
import { cartQuery } from "#public/js/graphql-service/cart-graphql-service.js";
import type { OrderModel } from "#src/const/model/OrderModel.js";

const GRAPHQL_URL = "/graphql";
export const orderQuery = `
  id
  userId
  user: {
    ${userQuery}
  }
  cartId
  cart: {
    ${cartQuery}
  }
  registerDate
  address
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

export class OrderGraphqlService {
  // --------------------------------------------- CRUD
  static async addOrder(data: OrderModel): Promise<OrderModel> {
    const query = `
      mutation AddOrder($data: OrderInput!) {
        addOrder(data: $data) {
          ${orderQuery}
        }
      }
    `;

    try {
      const responseData = await graphqlRequest<{ addOrder: OrderModel }>(
        query,
        { data },
      );
      return responseData.addOrder;
    } catch (error: any) {
      console.error("[API ERROR]: Failed to add order", error.message);
      throw error;
    }
  }

  static async deleteOrder(id: string): Promise<OrderModel> {
    const query = `
      mutation DeleteOrder($id: ID!) {
        deleteOrder(id: $id) {
          ${orderQuery}
        }
      }
    `;

    try {
      const responseData = await graphqlRequest<{ deleteOrder: OrderModel }>(
        query,
        { id },
      );
      return responseData.deleteOrder;
    } catch (error: any) {
      console.error("[API ERROR]: Failed to delete order", error.message);
      throw error;
    }
  }

  // --------------------------------------------- EXTRA
}
