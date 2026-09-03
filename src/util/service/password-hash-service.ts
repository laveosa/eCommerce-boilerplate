import * as crypto from "node:crypto";
import { promisify } from "node:util";
import bcrypt from "bcryptjs";

const scryptAsync = promisify(crypto.scrypt);

export default class PasswordHashService {
  private static SALT_ROUNDS = 12;

  static async hashPasswordNode(password: string): Promise<string> {
    const salt = crypto.randomBytes(16).toString("hex");
    const derivedKey = (await scryptAsync(password, salt, 64)) as Buffer;
    return `${salt}:${derivedKey.toString("hex")}`;
  }

  static async verifyPasswordNode(
    password: string,
    hash: string,
  ): Promise<boolean> {
    const [salt, key] = hash.split(":");
    const keyBuffer = Buffer.from(key, "hex");
    const derivedKey = (await scryptAsync(password, salt, 64)) as Buffer;
    return crypto.timingSafeEqual(keyBuffer, derivedKey);
  }

  static async hashPasswordBCrypt(password: string): Promise<string> {
    return await bcrypt.hash(password, this.SALT_ROUNDS);
  }

  static async verifyPasswordBCrypt(
    password: string,
    hash: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
