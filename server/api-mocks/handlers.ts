import { rest } from "msw";
import crypto from "crypto";

const generateFakeAccessToken = () => {
  const header = crypto.randomBytes(32).toString("hex");
  const payload = crypto.randomBytes(32).toString("hex");
  const signature = crypto.randomBytes(32).toString("hex");

  return `${header}.${payload}.${signature}`;
};

export const handlers = [
  rest.post(`${process.env.BASE_URL}/api/v1/users`, (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({
        status: "success",
        message: "User created",
        data: {
          id: 1,
          email: "test-user@example.com",
          verificationStatus: "PENDING",
          createdAt: Date.now().toString(),
          updatedAt: Date.now().toString(),
        },
      })
    );
  }),

  rest.post(
    `${process.env.BASE_URL}/api/v1/users/confirmation`,
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          status: "success",
          message: "User confirmed",
          data: {
            accessToken: generateFakeAccessToken(),
          },
        })
      );
    }
  ),
];
