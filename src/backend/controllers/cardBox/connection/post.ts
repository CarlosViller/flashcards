import prisma from "@/backend/prisma/client";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Joi from "joi";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

const schema = Joi.object({ boxId: Joi.string().required() }).required();

export async function cardBoxConnectionHandler(
  req: NextApiRequest,
  res: NextApiResponse,
  action: "connect" | "disconnect"
) {
  const parsedBody = JSON.parse(req.body);
  const { error } = schema.validate(parsedBody);

  if (error) {
    return res.status(400).json({ message: error });
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session?.user?.email) {
    return res.status(401).json({ message: "You must be logged in." });
  }

  if (action === "connect") {
    await prisma.user.update({
      where: {
        email: session.user.email,
      },
      data: {
        boxes: {
          connect: {
            id: parsedBody.boxId,
          },
        },
      },
    });
  } else {
    await prisma.user.update({
      where: {
        email: session.user.email,
      },
      data: {
        boxes: {
          disconnect: {
            id: parsedBody.boxId,
          },
        },
      },
    });
  }

  return res.json({ success: true });
}
