import { DBUser } from "@/types/shared";
import { db, generateOTP } from "@/utils";

export class UserMagicToken {
  static async create(user: DBUser) {
    const expirationTime = 5 * 60 * 1000; // 5 minutes
    const expiresAt = new Date(Date.now() + expirationTime);

    return db.userMagicTokens.create({
      data: {
        token: await this.generateUniqueToken(),
        userId: user.id,
        expiresAt,
      },
    });
  }

  private static async generateUniqueToken(): Promise<string> {
    const otp = generateOTP();

    const dbToken = await db.userMagicTokens.findUnique({
      where: {
        token: otp,
      },
    });

    if (dbToken) return this.generateUniqueToken();

    return otp;
  }
}
