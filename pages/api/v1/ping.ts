import type { NextApiRequest, NextApiResponse } from "next";

import { HTTPStatus } from "@/types/shared";

type Data = {
  status: string;
  message: string;
};

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(HTTPStatus.OK).json({ status: "success", message: "pong" });
}
