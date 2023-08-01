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

  try {
    const cardBoxes = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      select: {
        boxes: true,
      },
    });

    if (cardBoxes) return res.json(cardBoxes.boxes);

    return res.json([]);
  } catch (err) {
    return res.status(500).json(err);
  }
}
