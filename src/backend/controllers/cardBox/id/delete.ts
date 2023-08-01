import prisma from "@/backend/prisma/client";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

export async function deleteCardWithId(
  req: NextApiRequest,
  res: NextApiResponse,
  id: string
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session?.user?.email) {
    return res.status(401).send("Unauthorized");
  }

  try {
    await prisma.cardBox.update({
      where: {
        id: Number(id),
      },
      data: {
        users: {
          disconnect: {
            email: session.user.email,
          },
        },
      },
    });
    return res.end();
  } catch (error) {
    return res.status(500).json(error);
  }
}
