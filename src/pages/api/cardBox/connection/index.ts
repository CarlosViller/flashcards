import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
import prisma from "@/backend/prisma/client";
import Joi from "joi";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    return cardBoxConnectionHandler(req, res, "connect");
    // I would like to use DELETE but Next has a bug with bodies in DELETE method
  } else if (req.method === "PUT") {
    return cardBoxConnectionHandler(req, res, "disconnect");
  }

  return res.status(400).json({ message: "Bad request" });
}

const schema = Joi.object({ boxId: Joi.number().required() }).required();

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
  const box = await prisma.cardBox.findUnique({
    where: { id: Number(parsedBody.boxId) },
    include: {
      cards: {
        select: {
          question: true,
          answer: true,
        },
      },
    },
  });

  if (!box) return res.status(500).json({ message: "boxId not found" });

  if (action === "connect") {
    const { id } = await prisma.cardBox.create({
      data: {
        boxName: box.boxName,
        cards: {
          create: box.cards,
        },
        creator: {
          connect: {
            email: session.user.email,
          },
        },
      },
    });

    return res.json({ boxId: id });
  } else {
    await prisma.cardBox.delete({ where: { id: parsedBody.boxId } });

    return res.json({ success: true });
  }
}
