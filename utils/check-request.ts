import {
  HTTPMethod,
  HTTPStatus,
  Middleware,
  RequestStatus,
} from "@/types/shared";

type CheckRequestOptions = {
  is: HTTPMethod;
};

type CheckRequestFn = (opt: CheckRequestOptions) => Middleware;

export const checkRequest: CheckRequestFn =
  ({ is }) =>
  (req, res, next) => {
    if (req.method !== is) {
      return res
        .setHeader("Allow", is)
        .status(HTTPStatus.METHOD_NOT_ALLOWED)
        .json({ status: RequestStatus.ERROR, message: "Method not allowed" });
    }

    return next();
  };
