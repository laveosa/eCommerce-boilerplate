import fsP from "node:fs/promises";
import { getErrorMessage } from "#src/util/helper/messages-helper.js";

export default class FsService {
  static async createFolder(targetPath: string) {
    if (!targetPath || targetPath.length === 0) return null;

    try {
      return await fsP.mkdir(targetPath, { recursive: true });
    } catch (err) {
      const errorMsg = getErrorMessage(err);
      console.log(
        `[SERVER_ERROR]: error to create a folder : path: "${targetPath}" : error: ${errorMsg}`,
      );
      throw errorMsg;
    }
  }

  static async readFile(targetPath: string): Promise<string> {
    if (!targetPath || targetPath.length === 0) return null;

    try {
      return await fsP.readFile(targetPath, "utf-8");
    } catch (err: any) {
      if (err.code === "ENOENT") {
        console.log(`[SERVER_ERROR]: file not exist`);
        return "";
      }

      const errorMsg = getErrorMessage(err);
      console.log(
        `[SERVER_ERROR]: error to read a file : path: "${targetPath}" : error: ${errorMsg}`,
      );
      throw errorMsg;
    }
  }

  static async writeFile(targetPath: string, data: any): Promise<void> {
    if (!targetPath || targetPath.length === 0 || !data) return null;

    try {
      return await fsP.writeFile(targetPath, data, "utf-8");
    } catch (err) {
      const errorMsg = getErrorMessage(err);
      console.log(
        `[SERVER_ERROR]: error write to a file : path: "${targetPath}" : error: ${errorMsg}`,
      );
      throw errorMsg;
    }
  }

  static async deleteFile(targetPath: string): Promise<void> {
    if (!targetPath || targetPath.length === 0) return null;

    try {
      return await fsP.unlink(targetPath);
    } catch (err) {
      const errorMsg = getErrorMessage(err);
      console.log(
        `[SERVER_ERROR]: error delete a file : path: "${targetPath}" : error: ${errorMsg}`,
      );
      throw errorMsg;
    }
  }

  static async deleteFolder(targetPath: string): Promise<void> {
    if (!targetPath || targetPath.length === 0) return null;

    try {
      return await fsP.rmdir(targetPath);
    } catch (err) {
      const errorMsg = getErrorMessage(err);
      console.log(
        `[SERVER_ERROR]: error delete a folder : path: "${targetPath}" : error: ${errorMsg}`,
      );
      throw errorMsg;
    }
  }
}
