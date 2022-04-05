import { db, hashPassword } from "@/utils";

type UserReqParams = {
  email: string;
  password: string;
};

export default class User {
  static async create({ email, password }: UserReqParams) {
    return db.user.create({
      data: { email, passwordDigest: await hashPassword(password) },
    });
  }

  static findByEmail(email: string) {
    return db.user.findUnique({
      where: {
        email,
      },
    });
  }
}
