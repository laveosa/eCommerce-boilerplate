import { Product } from "#src/const/model/ProductModel.js";
import { getErrorModel } from "#src/util/helper/messages-helper.js";
import type { IProductService } from "#src/const/interface/IProductService.js";
import type { ProductModel } from "#src/const/scheme/ProductScheme.js";

export default class ProductService implements IProductService {
  async set(data: ProductModel[]): Promise<ProductModel[]> {
    if (!data || !Array.isArray(data)) {
      throw getErrorModel(400, `[SERVER_ERROR]: invalid data payload`);
    }

    try {
      await Product.deleteMany({});
      await Product.insertMany(data);
      return this.get();
    } catch (err) {
      throw getErrorModel(500, err, "[SERVER_ERROR]: failed to set all");
    }
  }

  async get(): Promise<ProductModel[]> {
    try {
      const products = await Product.find();
      return products.map((p) => p.toObject<ProductModel>());
    } catch (err) {
      throw getErrorModel(500, err, "[SERVER_ERROR]: failed to get all");
    }
  }

  async getProduct(id: string): Promise<ProductModel> {
    if (!id || id.length === 0) {
      throw getErrorModel(400, `[SERVER_ERROR]: invalid id: "${id}"`);
    }

    try {
      const product = await Product.findById(id);

      if (!product) {
        throw getErrorModel(404, "[SERVER_ERROR]: product not found!");
      }

      return product.toObject<ProductModel>();
    } catch (err) {
      throw getErrorModel(500, err, "[SERVER_ERROR]: failed to get");
    }
  }

  async addProduct(data: ProductModel): Promise<ProductModel> {
    if (!data || typeof data !== "object") {
      throw getErrorModel(400, `[SERVER_ERROR]: invalid data: "${data}"`);
    }

    try {
      const created = await Product.create(data);
      return created.toObject<ProductModel>();

      // step by step approach to create new entity
      /*const newProduct = new Product(data);
      const savedProduct = await newProduct.save();
      return savedProduct.toObject<ProductModel>();*/
    } catch (err) {
      throw getErrorModel(500, err, "[SERVER_ERROR]: failed to add");
    }
  }

  async updateProduct(data: ProductModel): Promise<ProductModel> {
    if (!data || typeof data !== "object" || !data.id || data.id.length === 0) {
      throw getErrorModel(
        400,
        `[SERVER_ERROR]: invalid data or id: "${data?.id}"`,
      );
    }

    try {
      const updated = await Product.findByIdAndUpdate(data.id, data, {
        returnDocument: "after",
        runValidators: true,
      });

      if (!updated) {
        throw getErrorModel(404, "[SERVER_ERROR]: product not found!");
      }

      return updated.toObject<ProductModel>();
    } catch (err) {
      throw getErrorModel(500, err, "[SERVER_ERROR]: failed to update!");
    }
  }

  async deleteProduct(id: string): Promise<ProductModel> {
    if (!id || id.length === 0) {
      throw getErrorModel(400, `[SERVER_ERROR]: invalid id: "${id}"!`);
    }

    try {
      const deleted = await Product.findByIdAndDelete(id, {
        returnDocument: "after",
      });

      if (!deleted) {
        throw getErrorModel(404, "[SERVER_ERROR]: product not found!");
      }

      return deleted.toObject<ProductModel>();
    } catch (err) {
      throw getErrorModel(500, err, "[SERVER_ERROR]: failed to delete");
    }
  }
}
