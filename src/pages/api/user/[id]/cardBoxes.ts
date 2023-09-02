import prisma from "@/backend/prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (typeof id !== "string") {
    return res.status(400).send("Bad request");
  }

  if (req.method === "GET") {
    return fetchUserCardBoxes(res, id);
  }

  return res.status(400).send("Bad request");
}

async function fetchUserCardBoxes(res: NextApiResponse, id: string) {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      boxes: true,
    },
  });

  return res.json(user?.boxes || []);
}
