import { Middleware } from "@/types/shared";

export const convertUserEmailToLowerCase: Middleware = (req, _res, next) => {
  if (req.body?.email) {
    req.body.email = req.body.email.toLowerCase();
  }

  return next();
};
