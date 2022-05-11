import { sendConfirmationEmail } from "@/server/mailers";
import { TokenType, UserRecord, VerificationStatus } from "@/types/shared";
import { db } from "@/utils";

import { UserAuthTokenService } from "./user-auth-token";

type CreateUserArgs = {
  email: string;
};

type ConfirmUserArgs = {
  email: string;
  token: string;
};

const { user: User } = db;

const createUser = async ({ email }: CreateUserArgs): Promise<UserRecord> => {
  const user = await User.create({
    data: { email },
  });
  const userMagicToken = await UserAuthTokenService.createAuthToken(
    user,
    TokenType.MAGIC_TOKEN
  );

  sendConfirmationEmail(user.email, userMagicToken.token);

  return user;
};

const findByEmail = (email: string): Promise<UserRecord | null> => {
  return User.findUnique({ where: { email } });
};

const confirmUser = async ({ email, token }: ConfirmUserArgs) => {
  await User.update({
    where: { email },
    data: {
      verificationStatus: VerificationStatus.VERIFIED,
    },
  });
  await UserAuthTokenService.invalidateToken(token);
};

const serviceMethods = () => ({
  createUser,
  findByEmail,
  confirmUser,
});

export const UserService = serviceMethods();
