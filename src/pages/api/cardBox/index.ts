import { createCardBox } from "@/backend/controllers/cardBox/post";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    return createCardBox(req, res);
  }

  return res.status(400).json({ message: "Bad request" });
}
