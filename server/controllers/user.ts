import { UserService } from "@/server/services";
import {
  HTTPStatus,
  MagicTokenRecord,
  Middleware,
  RequestStatus,
  RequestWithCredentials,
  UserRecord,
} from "@/types/shared";

export const createUser: Middleware = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await UserService.createUser({ email });

    return res.status(HTTPStatus.CREATED).json({
      status: RequestStatus.SUCCESS,
      message: "User created",
      data: user,
    });
  } catch {
    // TODO: use an error logging service to log the error thrown
    return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({
      status: RequestStatus.ERROR,
      message: "Internal server error",
    });
  }
};

export const confirmNewUser: Middleware = async (req, res) => {
  const { token } = req as RequestWithCredentials<MagicTokenRecord["token"]>;
  const { email } = req as RequestWithCredentials<UserRecord["email"]>;

  try {
    UserService.confirmUser({ email, token });
    // Log user in
    // AuthService.loginUser(email)
    // Create long-lived refresh token (session-cookie ==> save as httpOnly secure cookie)
    // Create short-lived access token (jwt ==> save in application memory)
    //
    // User makes auth request with the access token
    // when access token expires, refresh token is used to get a new access+refresh token pair
    // old refresh token is invalidated
    // when refresh token expires, user is logged out

    return res.status(HTTPStatus.OK).json({
      status: RequestStatus.SUCCESS,
      message: "User confirmed",
      data: {
        token,
        email,
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
