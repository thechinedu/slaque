import { UserRecord, TokenType } from "@/types/shared";
import { db, generateOTP } from "@/utils";

import { UserService } from "./user";

const { userAuthToken: UserAuthToken } = db;

const authTokenOptions = {
  MAGIC_TOKEN: () => ({
    TOKEN_SIZE: 6,
    TOKEN_EXPIRY_MS: 5 * 60_000, // 5 minutes
  }),
  REFRESH_TOKEN: () => ({
    TOKEN_SIZE: 128,
    TOKEN_EXPIRY_MS: 48 * 60 * 60_000, // 2 days
  }),
};

const generateUniqueToken = async (tokenSize: number = 6): Promise<string> => {
  const otp = generateOTP(tokenSize);

  const dbToken = await UserAuthToken.findUnique({
    where: {
      token: otp,
    },
  });

  if (dbToken) return generateUniqueToken(tokenSize);

  return otp;
};

const createAuthToken = async (
  user: UserRecord,
  type: keyof typeof TokenType
) => {
  const options = authTokenOptions[type]();
  const expirationTimeMS = options.TOKEN_EXPIRY_MS;
  const expiresAt = new Date(Date.now() + expirationTimeMS);

  // TODO: Invalidate previous tokens before creating a new one

  return UserAuthToken.create({
    data: {
      token: await generateUniqueToken(options.TOKEN_SIZE),
      userId: user.id,
      type,
      expiresAt,
    },
  });
};

const findByToken = (user: UserRecord, token: string) => {
  return UserAuthToken.findFirst({ where: { token, userId: user.id } });
};

const findUserByEmail = (email: string) => {
  return UserService.findByEmail(email);
};

const invalidateToken = async (token: string) => {
  await UserAuthToken.update({
    where: { token },
    data: { isValid: false },
  });
};

const serviceMethods = () => ({
  createAuthToken,
  findByToken,
  findUserByEmail,
  invalidateToken,
});

export const UserAuthTokenService = serviceMethods();
