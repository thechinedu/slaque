import type { NextApiRequest, NextApiResponse } from "next";
import { User, UserMagicToken, UserVerificationStatus } from "@prisma/client";

export enum RequestStatus {
  FAIL = "fail",
  ERROR = "error",
  SUCCESS = "success",
}

export type Data = {
  status: RequestStatus;
  message: string;
  data?: unknown;
  errors?: unknown;
};

export type Middleware = (
  req: NextApiRequest,
  res: NextApiResponse<Data>,
  next: () => void // invoke the next middleware in the queue
) => void;

export enum HTTPStatus {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  UNPROCESSABLE_ENTITY = 422,
  INTERNAL_SERVER_ERROR = 500,
}

export enum HTTPMethod {
  GET = "GET",
  POST = "POST",
  PATCH = "PATCH",
  PUT = "PUT",
  DELETE = "DELETE",
}

export type UserRecord = User;
export type MagicTokenRecord = UserMagicToken;
export const VerificationStatus = UserVerificationStatus;

export type RequestWithCredentials<T> = NextApiRequest & {
  [key: string]: T;
};
