import {
  HTTPMethod,
  HTTPStatus,
  Middleware,
  RequestStatus,
} from "@/types/shared";
import { UserService } from "@/server/services";
import { checkRequest } from "@/utils";
import validator from "validator";

const ensureRequiredFieldsPresent: Middleware = (req, res, next) => {
  if (!req.body) {
    return res.status(HTTPStatus.BAD_REQUEST).json({
      status: RequestStatus.ERROR,
      message: "Request body is required",
    });
  }

  const {
    body: { email },
  } = req;

  if (!email) {
    return res.status(HTTPStatus.BAD_REQUEST).json({
      status: RequestStatus.ERROR,
      message: "Please provide your email address",
    });
  }

  return next();
};

const ensureValidEmail: Middleware = (req, res, next) => {
  const {
    body: { email },
  } = req;
  const errors = [];

  if (!validator.isEmail(email)) {
    errors.push("Email is not valid");
  }

  if (errors.length) {
    return res.status(HTTPStatus.UNPROCESSABLE_ENTITY).json({
      status: RequestStatus.FAIL,
      message: "Validation failed",
      errors,
    });
  }

  return next();
};

const ensureEmailUniqueness: Middleware = async (req, res, next) => {
  const {
    body: { email },
  } = req;

  try {
    const user = await UserService.findByEmail(email);
    if (user) {
      return res.status(HTTPStatus.UNPROCESSABLE_ENTITY).json({
        status: RequestStatus.FAIL,
        message: "Validation failed",
        errors: ["Email is already in use by another user"],
      });
    }
  } catch (err) {
    console.log(err);
    // TODO: use an error logging service to log the error thrown
    return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({
      status: RequestStatus.ERROR,
      message: "Internal server error",
    });
  }

  return next();
};

export const createUserValidators = () => [
  checkRequest({ is: HTTPMethod.POST }),
  ensureRequiredFieldsPresent,
  ensureValidEmail,
  ensureEmailUniqueness,
];
