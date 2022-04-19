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

  static findByEmail(email: ReqParams["email"]) {
    return db.user.findUnique({
      where: {
        email,
      },
    });
  }
}
