import { deleteCardWithId } from "@/backend/controllers/cardBox/id/delete";
import { fetchCardBoxWithId } from "@/backend/controllers/cardBox/id/get";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (typeof id !== "string") {
    return res.status(400).send("Bad request");
  }

  console.log(req.method)

  if (req.method === "GET") {
    return fetchCardBoxWithId(req, res, id);
  }else if(req.method === "DELETE") {
    return deleteCardWithId(req, res, id)
  }

  return res.status(400).send("Bad request");
}
