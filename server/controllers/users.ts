import { sendConfirmationEmail } from "@/server/mailers";
import { User, UserMagicToken } from "@/server/models";
import {
  HTTPStatus,
  Middleware,
  RequestStatus,
  RequestWithToken,
} from "@/types/shared";

export const createUser: Middleware = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.create({ email });
    const magicToken = await UserMagicToken.create(user);

    sendConfirmationEmail(email, magicToken.token);

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
  // find user by magic token
  // set isValid to false on the magic token
  // set user verification status to verified
  // log the user in

  const { magicToken } = req as RequestWithToken;

  try {
    const user = await User.findByMagicToken(magicToken.token);

    return res.status(HTTPStatus.OK).json({
      status: RequestStatus.SUCCESS,
      message: "User confirmed",
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
