import argon2, { argon2id } from "argon2";
import { randomBytes } from "crypto";
import jwt from "jsonwebtoken";

type HashPasswordFn = (value: string) => Promise<string>;

// https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html
const hashOptions = {
  type: argon2id,
  memoryCost: 15 * 1024,
  parallelism: 1,
  timeCost: 2,
};

export const hashPassword: HashPasswordFn = async (password) =>
  await argon2.hash(password, hashOptions);

export const generateOTP = () =>
  randomBytes(6 / 2)
    .toString("hex")
    .toUpperCase();

export const generateAccessToken = (data: string) =>
  jwt.sign({ data }, process.env.SECRET_KEY as string, {
    expiresIn: "15m",
  });

export const verifyAccessToken = (token: string) =>
  jwt.verify(token, process.env.SECRET_KEY as string);
