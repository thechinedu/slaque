import {
  HTTPMethod,
  HTTPStatus,
  MagicToken,
  Middleware,
  RequestStatus,
  RequestWithToken,
} from "@/types/shared";
import { UserMagicToken } from "@/server/models";
import { checkRequest } from "@/utils";
import { NextApiRequest } from "next";
// import validator from "validator";

const ensureRequiredFieldsPresent: Middleware = (req, res, next) => {
  const {
    body: { token },
  } = req;

  if (!token) {
    return res.status(HTTPStatus.BAD_REQUEST).json({
      status: RequestStatus.ERROR,
      message: "Please provide the confirmation token",
    });
  }

  return next();
};

const ensureValidToken: Middleware = async (req, res, next) => {
  const {
    body: { token },
  } = req;

  try {
    const magicToken = await UserMagicToken.findByToken(token);
    const now = Date.now();

    if (!magicToken) {
      return res.status(HTTPStatus.BAD_REQUEST).json({
        status: RequestStatus.ERROR,
        message: "Please provide a valid confirmation token",
      });
    }

    if (!magicToken.isValid || +magicToken.expiresAt < now) {
      return res.status(HTTPStatus.UNPROCESSABLE_ENTITY).json({
        status: RequestStatus.FAIL,
        message: "The confirmation token has expired",
      });
    }

    (req as RequestWithToken).magicToken = magicToken;
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
