import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "@/backend/prisma/client";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (typeof id !== "string") {
    return res.status(400).send("Bad request");
  }

  if (req.method === "GET") {
    return fetchCardBoxWithId(req, res, id);
  }

  return res.status(400).send("Bad request");
}

async function fetchCardBoxWithId(
  req: NextApiRequest,
  res: NextApiResponse,
  id: string
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session?.user?.email) {
    return res.status(401).send("Unauthorized");
  }

  const cardBox = await prisma.cardBox.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      cards: true,
    },
  });

  return res.json(cardBox);
}

