import type { NextApiRequest, NextApiResponse } from "next";

import { createUser } from "@/server/controllers/users";
import { createUserValidators } from "@/server/validators/users";
import { chainMiddlewares } from "@/utils";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const executeMiddlewares = chainMiddlewares(
    ...createUserValidators(),
    createUser
  );

  executeMiddlewares(req, res);
}
