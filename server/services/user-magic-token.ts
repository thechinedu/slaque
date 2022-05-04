import { UserRecord } from "@/types/shared";
import { db, generateOTP } from "@/utils";

import { UserService } from "./user";

const { userMagicToken: UserMagicToken } = db;

const generateUniqueToken = async (): Promise<string> => {
  const otp = generateOTP();

  const dbToken = await UserMagicToken.findUnique({
    where: {
      token: otp,
    },
  });

  if (dbToken) return generateUniqueToken();

  return otp;
};

const createMagicToken = async (user: UserRecord) => {
  const expirationTime = 5 * 60 * 1000; // 5 minutes
  const expiresAt = new Date(Date.now() + expirationTime);

  return UserMagicToken.create({
    data: {
      token: await generateUniqueToken(),
      userId: user.id,
      expiresAt,
    },
  });
};

const findByToken = (user: UserRecord, token: string) => {
  return UserMagicToken.findFirst({ where: { token, userId: user.id } });
};

const findUserByEmail = (email: string) => {
  return UserService.findByEmail(email);
};

const invalidateToken = (token: string) => {
  UserMagicToken.update({
    where: { token },
    data: { isValid: false },
  });
};

const serviceMethods = () => ({
  createMagicToken,
  findByToken,
  findUserByEmail,
  invalidateToken,
});

export const UserMagicTokenService = serviceMethods();
