import { fetchCardBoxWithId } from "@/backend/controllers/cardBox/id/get";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (typeof id !== "string") {
    return res.status(400).send("Bad request");
  }

  if (req.method === "GET") {
    console.log(id)
    return fetchCardBoxWithId(req, res, id);
  }

  return res.status(400).send("Bad request");
}
