import { cardBoxConnectionHandler } from "@/backend/controllers/cardBox/connection/post";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    return cardBoxConnectionHandler(req, res, "connect");
  } else if (req.method === "DELETE") {
    return cardBoxConnectionHandler(req, res, "disconnect");
  }

  return res.status(400).json({ message: "Bad request" });
}
