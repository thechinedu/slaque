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
  const expirationTime = 60 * 60 * 1000; // TODO: (1 hour) Change to 5 minutes
  const expiresAt = new Date(Date.now() + expirationTime);

  // TODO: Invalidate previous tokens before creating a new one

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

const invalidateToken = async (token: string) => {
  await UserMagicToken.update({
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
