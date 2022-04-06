import User from "@/server/models/user";
import { HTTPStatus, Middleware } from "@/types/shared";

export const createUser: Middleware = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.create({ email: email.toLowerCase() });

    return res
      .status(HTTPStatus.CREATED)
      .json({ status: "success", message: "User created", data: user });
  } catch (err) {
    // TODO: use an error logging service to log the error thrown
    return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: "Internal server error",
    });
  }
};
