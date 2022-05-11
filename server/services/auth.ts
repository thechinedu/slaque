import { TokenType, UserRecord } from "@/types/shared";
import { generateAccessToken } from "@/utils/auth";

import { UserAuthTokenService } from "./user-auth-token";

// AuthService.loginUser(email)
// Create long-lived refresh token (session-cookie ==> save as httpOnly secure cookie)
// Create short-lived access token (jwt ==> save in application memory) and send it to the client ✅
//
// User makes auth request with the access token
// when access token expires, refresh token is used to get a new access+refresh token pair
// old refresh token is invalidated
// when refresh token expires, user is logged out

const loginUser = async (user: UserRecord) => {
  const accessToken = generateAccessToken(user.id);
  const refreshToken = await UserAuthTokenService.createAuthToken(user, TokenType.REFRESH_TOKEN);

  return { accessToken, refreshToken };
};

const serviceMethods = () => ({
  loginUser,
});

export const AuthService = serviceMethods();
