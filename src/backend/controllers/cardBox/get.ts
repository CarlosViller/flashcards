import prisma from "@/backend/prisma/client";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

export async function fetchCardBoxes(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session?.user?.email) {
    return res.status(401).send("Unauthorized");
  }

  const cardBoxes = await prisma.cardBox.findMany({
    where: {
      user: {
        email: session.user.email,
      },
    },
  });

  return res.json(cardBoxes);
}
