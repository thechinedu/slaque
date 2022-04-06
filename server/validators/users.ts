import { HTTPMethod, HTTPStatus, Middleware } from "@/types/shared";
import User from "@/server/models/user";
import validator from "validator";

const ensureAllowedRequest: Middleware = (req, res, next) => {
  if (req.method !== HTTPMethod.POST) {
    return res
      .setHeader("Allow", HTTPMethod.POST)
      .status(HTTPStatus.METHOD_NOT_ALLOWED)
      .json({ status: "error", message: "Method not allowed" });
  }

  return next();
};

const ensureRequiredFieldsPresent: Middleware = (req, res, next) => {
  const { body } = req;
  const { email } = body;

  if (!email) {
    return res.status(HTTPStatus.BAD_REQUEST).json({
      status: "error",
      message: "Please provide your email address",
    });
  }

  return next();
};

const ensureEmailUniqueness: Middleware = async (req, res, next) => {
  const { body } = req;
  const { email } = body;

  try {
    const user = await User.findByEmail(email);
    if (user) {
      return res.status(HTTPStatus.UNPROCESSABLE_ENTITY).json({
        status: "fail",
        message: "Validation failed",
        errors: ["Email is already in use by another user"],
      });
    }
  } catch {
    // TODO: use an error logging service to log the error thrown
    return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: "Internal server error",
    });
  }

  return next();
};

const ensureValidEmail: Middleware = (req, res, next) => {
  const { body } = req;
  const { email } = body;
  const errors = [];

  if (!validator.isEmail(email)) {
    errors.push("Email is not valid");
  }

  if (errors.length) {
    return res.status(HTTPStatus.UNPROCESSABLE_ENTITY).json({
      status: "fail",
      message: "Validation failed",
      errors,
    });
  }

  return next();
};

export const createUserValidators = () => [
  ensureAllowedRequest,
  ensureRequiredFieldsPresent,
  ensureValidEmail,
  ensureEmailUniqueness,
];
