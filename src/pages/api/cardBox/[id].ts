import prisma from "@/backend/prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (typeof id !== "string") {
    return res.status(400).json({ error: "Bad id" });
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
