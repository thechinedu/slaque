import { AuthService, UserService } from "@/server/services";
import {
  HTTPStatus,
  AuthTokenRecord,
  Middleware,
  RequestStatus,
  RequestWithCredentials,
  UserRecord,
} from "@/types/shared";
import { serialize } from "cookie";

export const createUser: Middleware = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await UserService.createUser({ email });

    return res.status(HTTPStatus.CREATED).json({
      status: RequestStatus.SUCCESS,
      message: "User created",
      data: user,
    });
  } catch (err) {
    console.log(err);
    // TODO: use an error logging service to log the error thrown
    return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({
      status: RequestStatus.ERROR,
      message: "Internal server error",
    });
  }
};

export const confirmNewUser: Middleware = async (req, res) => {
  const { token } = req as RequestWithCredentials<AuthTokenRecord["token"]>;
  const {
    user,
    user: { email },
  } = req as RequestWithCredentials<UserRecord>;

  try {
    await UserService.confirmUser({ email, token });
    const { accessToken, refreshToken } = await AuthService.loginUser(user);

    res.setHeader(
      "Set-Cookie",
      serialize("refreshToken", refreshToken.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        expires: new Date(refreshToken.expiresAt),
        sameSite: "strict", // cookie will oly be sent in a first-party context: https://web.dev/samesite-cookies-explained/
      })
    );

    return res.status(HTTPStatus.OK).json({
      status: RequestStatus.SUCCESS,
      message: "User confirmed",
      data: {
        accessToken,
      },
    });
  } catch (err) {
    console.log(err);
    // TODO: use an error logging service to log the error thrown
    return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({
      status: RequestStatus.ERROR,
      message: "Internal server error",
    });
  }
};
