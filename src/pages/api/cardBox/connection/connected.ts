import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

import prisma from "@/backend/prisma/client";
import { authOptions } from "../../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    return searchCardBoxes(req, res);
  }

  return res.status(400).json({ message: "Bad request" });
}

async function searchCardBoxes(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (typeof id !== "string")
    return res.status(400).json({ message: "Bad request" });

  const session = await getServerSession(req, res, authOptions);

  if (!session?.user?.email) {
    return res.status(401).send("Unauthorized");
  }

  try {
    const connectedUsers = await prisma.cardBox.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        users: {
          select: {
            email: true,
          },
        },
      },
    });

    if (connectedUsers) return res.json(connectedUsers);

    return res.json([]);
  } catch (err) {
    return res.status(500).json(err);
  }
}
