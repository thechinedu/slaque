import { generateAccessToken } from "@/utils/auth";

// AuthService.loginUser(email)
// Create long-lived refresh token (session-cookie ==> save as httpOnly secure cookie)
// Create short-lived access token (jwt ==> save in application memory) and send it to the client ✅
//
// User makes auth request with the access token
// when access token expires, refresh token is used to get a new access+refresh token pair
// old refresh token is invalidated
// when refresh token expires, user is logged out

const loginUser = (email: string) => {
  const accessToken = generateAccessToken(email);

  return accessToken;
};

const serviceMethods = () => ({
  loginUser,
});

export const AuthService = serviceMethods();
