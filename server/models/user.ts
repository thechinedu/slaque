import { db } from "@/utils";

type UserReqParams = {
  email: string;
};

export default class User {
  static async create({ email }: UserReqParams) {
    return db.user.create({
      data: { email, verificationStatus: "PENDING" },
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
