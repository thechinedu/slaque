import { DBUser } from "@/types/shared";
import { db } from "@/utils";

export class UserMagicToken {
  static async create(user: DBUser) {
    const expirationTime = 5 * 60 * 1000; // 5 minutes
    const expiresAt = new Date(Date.now() + expirationTime);

    return db.userMagicTokens.create({
      data: { token: "123456", userId: user.id, expiresAt },
    });
  }
}
