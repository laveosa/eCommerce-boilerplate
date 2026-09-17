import axios from "axios";

import type { IPaginatedResult } from "#src/const/interface/IPaginatedResult.js";
import type { ProductModel } from "#src/const/model/ProductModel.js";

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
      response.data.errors[0].message || "[GRAPHQL_ERROR]: Query failed",
    );
  }

  return response.data.data;
}

export class ProductGraphqlService {
  // --------------------------------------------- CRUD

  static async getAllProducts(
    search?: string,
    page?: number,
    perPage?: number,
  ): Promise<IPaginatedResult<ProductModel>> {
    const query = `
      query GetProducts($search: String, $page: Int, $perPage: Int) {
        products(search: $search, page: $page, perPage: $perPage) {
          data {
            id
            title
            imageUrl
            description
            price
            quantity
            inCart
          }
          pagination {
            current
            total
            prevPage
            nextPage
            perPage
          }
          filters {
            search
          }
        }
      }
    `;

    try {
      const data = await graphqlRequest<{
        products: IPaginatedResult<ProductModel>;
      }>(query, {
        search,
        page,
        perPage,
      });

      return data.products;
    } catch (error: any) {
      console.error("[API ERROR]: Failed to fetch products", error.message);
      throw error;
    }
  }

  static async getProduct(id: string): Promise<ProductModel> {
    const query = `
      query GetProduct($id: ID!) {
        product(id: $id) {
          id
          title
          imageUrl
          description
          price
          quantity
          inCart
        }
      }
    `;

    try {
      const data = await graphqlRequest<{ product: ProductModel }>(query, {
        id,
      });
      return data.product;
    } catch (error: any) {
      console.error("[API ERROR]: Failed to fetch product", error.message);
      throw error;
    }
  }

  static async addProduct(
    productData: Partial<ProductModel>,
  ): Promise<ProductModel> {
    const query = `
      mutation AddProduct($data: ProductInput!) {
        addProduct(data: $data) {
          id
          title
          imageUrl
          description
          price
          quantity
          inCart
        }
      }
    `;

    try {
      const data = await graphqlRequest<{ addProduct: ProductModel }>(query, {
        data: productData,
      });
      return data.addProduct;
    } catch (error: any) {
      console.error("[API ERROR]: Failed to add product", error.message);
      throw error;
    }
  }

  static async setAllProducts(
    products: ProductModel[],
  ): Promise<ProductModel[]> {
    const query = `
      mutation SetAllProducts($data: [ProductInput!]!) {
        setAllProducts(data: $data) {
          id
          title
          imageUrl
          description
          price
          quantity
          inCart
        }
      }
    `;

    try {
      const data = await graphqlRequest<{ setAllProducts: ProductModel[] }>(
        query,
        {
          data: products,
        },
      );
      return data.setAllProducts;
    } catch (error: any) {
      console.error("[API ERROR]: Failed to set all products", error.message);
      throw error;
    }
  }

  static async updateProduct(productData: ProductModel): Promise<ProductModel> {
    const query = `
      mutation UpdateProduct($data: ProductInput!) {
        updateProduct(data: $data) {
          id
          title
          imageUrl
          description
          price
          quantity
          inCart
        }
      }
    `;

    try {
      const data = await graphqlRequest<{ updateProduct: ProductModel }>(
        query,
        {
          data: productData,
        },
      );
      return data.updateProduct;
    } catch (error: any) {
      console.error("[API ERROR]: Failed to update product", error.message);
      throw error;
    }
  }

  static async deleteProduct(id: string): Promise<ProductModel> {
    const query = `
      mutation DeleteProduct($id: ID!) {
        deleteProduct(id: $id) {
          id
          title
          imageUrl
          description
          price
          quantity
          inCart
        }
      }
    `;

    try {
      const data = await graphqlRequest<{ deleteProduct: ProductModel }>(
        query,
        { id },
      );
      return data.deleteProduct;
    } catch (error: any) {
      console.error("[API ERROR]: Failed to delete product", error.message);
      throw error;
    }
  }

  static async deleteAllProduct(): Promise<ProductModel[]> {
    const query = `
      mutation DeleteAllProducts {
        deleteAllProducts {
          id
          title
          imageUrl
          description
          price
          quantity
          inCart
        }
      }
    `;

    try {
      const data = await graphqlRequest<{ deleteAllProducts: ProductModel[] }>(
        query,
      );
      return data.deleteAllProducts;
    } catch (error: any) {
      console.error(
        "[API ERROR]: Failed to delete all products",
        error.message,
      );
      throw error;
    }
  }

  // --------------------------------------------- EXTRA

  static async generateProducts(): Promise<ProductModel[]> {
    const query = `
      mutation GenerateProducts {
        generateProducts {
          id
          title
          imageUrl
          description
          price
          quantity
          inCart
        }
      }
    `;

    try {
      const data = await graphqlRequest<{ generateProducts: ProductModel[] }>(
        query,
      );
      return data.generateProducts;
    } catch (error: any) {
      console.error("[API ERROR]: Failed to generate products", error.message);
      throw error;
    }
  }
}
