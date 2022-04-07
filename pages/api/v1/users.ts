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

/**
 * User sign up and Authentication flow for base slaque
 * ========================================================================
 *
 * When a user signs up for an account, a one time token is sent to the user's email address
 * If the specified token is valid, the user is set as verified and the user is automatically
 * logged in (email-based passwordless login)
 *
 * The one time token should expire in a few minutes (users can request a new token)
 *
 * if a user creates a new account but doesn't verify it, the account will be deleted after a few days
 */

/**
 * User sign up and Authentication flow for a slaque workspace
 * ========================================================================
 *
 * When a user signs up for an account via a workspace url, a confirmatiion email is sent to the user's email address
 * on cofirmation of the email address, the user is set as verified
 * A main user account is created and a workspace account is created (tied to the main user account)
 * The user is required to enter their full name and a password for the workspace account
 * Once the required fields are provided, the workspace user is automatically logged in
 *
 * if a user creates a new account but doesn't verify it (in this case, through the confirmation link)
 * the account will be deleted after a few days
 *
 * Sign up through invitation will work similarly
 */
