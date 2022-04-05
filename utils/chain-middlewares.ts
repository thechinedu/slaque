import type { Data, Middleware } from "@/types/shared";
import type { NextApiRequest, NextApiResponse } from "next";

export const chainMiddlewares = (...middlewareFns: Middleware[]) => {
  return (
    req: NextApiRequest,
    res: NextApiResponse<Data>,
    afterAll?: () => void
  ) => {
    // Next middleware in the queue
    const next = () => {
      // Dequeue the next middleware in the queue
      const middlewareFn = middlewareFns.shift();

      // Invoke the middleware passing in the next middleware in the queue
      // The middleware can either call next() to invoke the next middleware
      // or terminate the request at any point by returning a response
      middlewareFn?.(req, res, next);
    };

    // Invoke the first middleware in the queue
    next();

    console.log(middlewareFns, "Does it get here???");

    // If all middlewares have been executed, execute the afterAll callback
    // In situations where a middleware terminates a request, this callback will not be triggered
    if (middlewareFns.length === 0) afterAll?.();
  };
};
