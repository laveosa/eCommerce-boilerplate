import { getErrorModel } from "#src/util/helper/messages-helper.js";
import type { IProductService } from "#src/const/interface/IProductService.js";
import type { ProductModel } from "#src/const/scheme/ProductScheme.js";

export default class ProductService implements IProductService {
  tableName: string = "products";

  async set(data: ProductModel[]): Promise<ProductModel[]> {
    if (!data || !Array.isArray(data)) {
      throw getErrorModel(400, `[SERVER_ERROR]: invalid data payload`);
    }

    await this.tableInitCheck();

    try {
      // TODO place db logic

      return this.get();
    } catch (err) {
      throw getErrorModel(500, err, "[SERVER_ERROR]: failed to set all");
    }
  }

  async get(): Promise<ProductModel[]> {
    await this.tableInitCheck();

    try {
      // TODO place db logic

      return null;
    } catch (err) {
      throw getErrorModel(500, err, "[SERVER_ERROR]: failed to get all");
    }
  }

  async getProduct(id: number): Promise<ProductModel> {
    if (isNaN(id))
      throw getErrorModel(400, `[SERVER_ERROR]: invalid id: "${id}"`);

    await this.tableInitCheck();

    try {
      // TODO place db logic

      return null;
    } catch (err) {
      throw getErrorModel(500, err, "[SERVER_ERROR]: failed to get");
    }
  }

  async addProduct(data: ProductModel): Promise<ProductModel> {
    if (!data || typeof data !== "object") {
      throw getErrorModel(400, `[SERVER_ERROR]: invalid data: "${data}"`);
    }

    await this.tableInitCheck();

    try {
      // TODO place db logic

      return null;
    } catch (err) {
      throw getErrorModel(500, err, "[SERVER_ERROR]: failed to add");
    }
  }

  async updateProduct(data: ProductModel): Promise<ProductModel> {
    if (!data || isNaN(data.id)) {
      throw getErrorModel(
        400,
        `[SERVER_ERROR]: invalid data or id: "${data?.id}"`,
      );
    }

    await this.tableInitCheck();

    try {
      // TODO place db logic

      return null;
    } catch (err) {
      throw getErrorModel(500, err, "[SERVER_ERROR]: failed to update");
    }
  }

  async deleteProduct(id: number): Promise<ProductModel> {
    if (isNaN(id)) {
      throw getErrorModel(400, `[SERVER_ERROR]: invalid id: "${id}"`);
    }

    const deleted = await this.getProduct(id);

    try {
      // TODO place db logic

      return deleted;
    } catch (err) {
      throw getErrorModel(500, err, "[SERVER_ERROR]: failed to delete");
    }
  }

  // ======================================== PRIVATE

  private async tableInitCheck() {
    try {
      // TODO place db logic
    } catch (err) {
      throw getErrorModel(
        500,
        err,
        `[SERVER_ERROR]: failed to initialize ${this.tableName} table`,
      );
    }
  }
}
