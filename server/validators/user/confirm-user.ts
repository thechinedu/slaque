import {
  HTTPMethod,
  HTTPStatus,
  AuthTokenRecord,
  Middleware,
  RequestStatus,
  RequestWithCredentials,
  UserRecord,
} from "@/types/shared";
import { UserAuthTokenService } from "@/server/services";
import { checkRequest } from "@/utils";

const ensureRequiredFieldsPresent: Middleware = (req, res, next) => {
  const {
    body: { token, email },
  } = req;
  const errors = [];

  if (!email) {
    errors.push("Please provide the email address for confirmation");
  }

  if (!token) {
    errors.push("Please provide the confirmation token");
  }

  if (errors.length) {
    return res.status(HTTPStatus.BAD_REQUEST).json({
      status: RequestStatus.ERROR,
      message: "Validation failed",
      errors,
    });
  }

  return next();
};

const ensureValidToken: Middleware = async (req, res, next) => {
  const {
    body: { token, email },
  } = req;

  try {
    const user = await UserAuthTokenService.findUserByEmail(email);

    if (!user) {
      return res.status(HTTPStatus.BAD_REQUEST).json({
        status: RequestStatus.ERROR,
        message: "User and token does not match",
      });
    }

    const magicToken = await UserAuthTokenService.findByToken(user, token);
    const now = Date.now();

    if (!magicToken || !magicToken.isValid) {
      return res.status(HTTPStatus.BAD_REQUEST).json({
        status: RequestStatus.ERROR,
        message: "Please provide a valid confirmation token",
      });
    }

    if (+magicToken.expiresAt < now) {
      return res.status(HTTPStatus.UNPROCESSABLE_ENTITY).json({
        status: RequestStatus.FAIL,
        message: "The confirmation token has expired",
      });
    }

    (req as RequestWithCredentials<AuthTokenRecord["token"]>).token =
      magicToken.token;
    (req as RequestWithCredentials<UserRecord>).user = user;
  } catch {
    // TODO: use an error logging service to log the error thrown
    return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({
      status: RequestStatus.ERROR,
      message: "Internal server error",
    });
  }

  return next();
};

export const confirmUserValidators = () => [
  checkRequest({ is: HTTPMethod.POST }),
  ensureRequiredFieldsPresent,
  ensureValidToken,
];
