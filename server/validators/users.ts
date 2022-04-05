import { HTTPMethod, HTTPStatus, Middleware } from "@/types/shared";
import User from "@/server/models/user";
import validator from "validator";

const ensureAllowedRequest: Middleware = (req, res, next) => {
  console.log("ensureAllowedRequest ==>", "runs this operation");
  if (req.method !== HTTPMethod.POST) {
    return res
      .setHeader("Allow", HTTPMethod.POST)
      .status(HTTPStatus.METHOD_NOT_ALLOWED)
      .json({ status: "error", message: "Method not allowed" });
  }

  return next();
};

const ensureRequiredFieldsPresent: Middleware = (req, res, next) => {
  console.log("ensureRequiredFieldsPresent ==>", "runs this operation");
  const { body } = req;
  const { email, password } = body;

  if (!email || !password) {
    return res.status(HTTPStatus.BAD_REQUEST).json({
      status: "error",
      message:
        "Please provide both email and password in the body of the request",
    });
  }

  return next();
};

const ensureEmailUniqueness: Middleware = async (req, res, next) => {
  console.log("ensureEmailUniqueness ==>", "runs this operation");
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

const ensureValidFields: Middleware = (req, res, next) => {
  console.log("ensureValidFields ==>", "runs this operation");
  const { body } = req;
  const { email, password } = body;
  const errors = [];

  if (!validator.isEmail(email)) {
    errors.push("Email is not valid");
  }

  if (!validator.isLength(password, { min: 8 })) {
    errors.push("Password must be at least 8 characters");
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

// TODO: API resolved without sending a response for /api/v1/users, this may result in stalled requests
// Investigate why this is happening
export const createUserValidators = () => [
  ensureAllowedRequest,
  ensureRequiredFieldsPresent,
  ensureEmailUniqueness,
  ensureValidFields,
];
