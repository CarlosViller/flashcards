
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
import prisma from "@/backend/prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    return searchCardBoxes(req, res);
  }

  return res.status(400).json({ message: "Bad request" });
}

async function searchCardBoxes(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { q } = req.query;

  if (typeof q !== "string")
    return res.status(400).json({ message: "Bad request" });

  const session = await getServerSession(req, res, authOptions);

  if (!session?.user?.email) {
    return res.status(401).send("Unauthorized");
  }

  try {
    const cardBoxes = await prisma.cardBox.findMany({
      where: {
        boxName: {
          contains: q,
          mode: 'insensitive',
        },
      },
      include: {
        users: {
          select: {
            email: true,
          },
        },
      },
    });

    if (cardBoxes) return res.json(cardBoxes);

    return res.json([]);
  } catch (err) {
    return res.status(500).json(err);
  }
}