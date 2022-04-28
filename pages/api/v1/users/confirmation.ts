import type { NextApiRequest, NextApiResponse } from "next";

import { confirmNewUser } from "@/server/controllers";
import { confirmUserValidators } from "@/server/validators";
import { chainMiddlewares } from "@/utils";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const executeMiddlewares = chainMiddlewares(
    ...confirmUserValidators(),
    confirmNewUser
  );

  executeMiddlewares(req, res);
}
