import type { NextApiRequest, NextApiResponse } from "next";

import { createUser } from "@/server/controllers/users";
import { createUserValidators } from "@/server/validators/users";
import { chainMiddlewares } from "@/utils";

// TODO: API resolved without sending a response for /api/v1/users, this may result in stalled requests
// Investigate why this is happening and try to resolve the issue
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const executeMiddlewares = chainMiddlewares(
    ...createUserValidators(),
    createUser
  );

  executeMiddlewares(req, res);
}
