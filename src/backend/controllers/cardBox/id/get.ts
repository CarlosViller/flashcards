import prisma from "@/backend/prisma/client";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

export async function fetchCardBoxWithId(
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
