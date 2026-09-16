import axios from "axios";

import type { UserModel } from "#src/const/model/UserModel.js";

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

export class AuthGraphqlService {
  static async register(data: any): Promise<UserModel> {
    const query = `
      mutation Register($data: InputAuth!) {
        register(data: $data) {
          id
          name
          email
        }
      }
    `;

    try {
      const responseData = await graphqlRequest<{ register: UserModel }>(
        query,
        { data },
      );
      return responseData.register;
    } catch (error: any) {
      console.error("[API ERROR]: Failed to register", error.message);
      throw error;
    }
  }

  static async signIn(data: any): Promise<UserModel> {
    const query = `
      mutation SignIn($data: InputAuth!) {
        signIn(data: $data) {
          id
          name
          email
        }
      }
    `;

    try {
      const responseData = await graphqlRequest<{ signIn: UserModel }>(query, {
        data,
      });
      return responseData.signIn;
    } catch (error: any) {
      console.error("[API ERROR]: Failed to sign in", error.message);
      throw error;
    }
  }

  static async signOut(): Promise<boolean> {
    const query = `
      mutation SignOut {
        signOut
      }
    `;

    try {
      const responseData = await graphqlRequest<{ signOut: boolean }>(query);
      return responseData.signOut;
    } catch (error: any) {
      console.error("[API ERROR]: Failed to sign out", error.message);
      throw error;
    }
  }
}
