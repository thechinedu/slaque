import User from "@/server/models/user";
import { HTTPStatus, Middleware } from "@/types/shared";

export const createUser: Middleware = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });

    res
      .status(HTTPStatus.CREATED)
      .json({ status: "success", message: "User created", data: user });
  } catch {
    // TODO: use an error logging service to log the error thrown
    res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: "Internal server error",
    });
  }
};
