import { sendConfirmationEmail } from "@/server/mailers";
import { User, UserMagicToken } from "@/server/models";
import { HTTPStatus, Middleware } from "@/types/shared";

export const createUser: Middleware = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.create({ email });
    const magicToken = await UserMagicToken.create(user);

    sendConfirmationEmail(email, magicToken.token);

    return res
      .status(HTTPStatus.CREATED)
      .json({ status: "success", message: "User created", data: user });
  } catch {
    // TODO: use an error logging service to log the error thrown
    return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: "Internal server error",
    });
  }
};
