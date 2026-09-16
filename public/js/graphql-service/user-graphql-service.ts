import axios from "axios";

const GRAPHQL_URL = "/graphql";

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

export class UserGraphqlService {
  static async updateName(id: string, value: string): Promise<boolean> {
    const query = `
      mutation UpdateName($id: ID!, $value: String!) {
        updateName(id: $id, value: $value)
      }
    `;

    try {
      const responseData = await graphqlRequest<{ updateName: boolean }>(
        query,
        { id, value },
      );
      return responseData.updateName;
    } catch (error: any) {
      console.error("[API ERROR]: Failed to update name", error.message);
      throw error;
    }
  }

  static async updateAddress(id: string, value: string): Promise<boolean> {
    const query = `
      mutation UpdateAddress($id: ID!, $value: String!) {
        updateAddress(id: $id, value: $value)
      }
    `;

    try {
      const responseData = await graphqlRequest<{ updateAddress: boolean }>(
        query,
        { id, value },
      );
      return responseData.updateAddress;
    } catch (error: any) {
      console.error("[API ERROR]: Failed to update address", error.message);
      throw error;
    }
  }

  static async updatePassword(id: string, value: string): Promise<boolean> {
    const query = `
      mutation UpdatePassword($id: ID!, $value: String!) {
        updatePassword(id: $id, value: $value)
      }
    `;

    try {
      const responseData = await graphqlRequest<{ updatePassword: boolean }>(
        query,
        { id, value },
      );
      return responseData.updatePassword;
    } catch (error: any) {
      console.error("[API ERROR]: Failed to update password", error.message);
      throw error;
    }
  }
}
