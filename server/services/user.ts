import { sendConfirmationEmail } from "@/server/mailers";
import { UserRecord, VerificationStatus } from "@/types/shared";
import { db } from "@/utils";

import { UserMagicTokenService } from "./user-magic-token";

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
  const userMagicToken = await UserMagicTokenService.createMagicToken(user);

  sendConfirmationEmail(user.email, userMagicToken.token);

  return user;
};

const findByEmail = (email: string): Promise<UserRecord | null> => {
  return User.findUnique({ where: { email } });
};

const confirmUser = ({ email, token }: ConfirmUserArgs) => {
  User.update({
    where: { email },
    data: {
      verificationStatus: VerificationStatus.VERIFIED,
    },
  });
  UserMagicTokenService.invalidateToken(token);
};

const serviceMethods = () => ({
  createUser,
  findByEmail,
  confirmUser,
});

export const UserService = serviceMethods();
