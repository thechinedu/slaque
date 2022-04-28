import { db } from "@/utils";

type ReqParams = {
  email: string;
};

enum VerificationStatus {
  PENDING = "PENDING",
  VERIFIED = "VERIFIED",
}

export class User {
  static async create({ email }: ReqParams) {
    return db.user.create({
      data: { email, verificationStatus: VerificationStatus.PENDING },
    });
  }

  static findByEmail(email: string) {
    return db.user.findUnique({
      where: {
        email,
      },
    });
  }

  static async findByMagicToken(token: string) {
    try {
      const raw =
        await db.$queryRaw`SELECT * FROM users, user_magic_tokens WHERE users.id = user_magic_tokens.userId AND user_magic_tokens.token = ${token}`;

      console.log({ raw });
    } catch (err) {
      console.log(err);
    }

    return db.user.findFirst({
      where: {
        magicTokens: {
          some: {
            token: {
              equals: token,
            },
            isValid: true,
          },
        },
      },
    });
  }
}
