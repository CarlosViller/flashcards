import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "@/backend/prisma/client";
import Joi from "joi";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    return createCardBox(req, res);
  } else if (req.method === "GET") {
    return fetchCardBoxes(req, res);
  }

  return res.status(400).json({ message: "Bad request" });
}

const schema = Joi.object({
  boxName: Joi.string().required(),
  cards: Joi.array().items(
    Joi.object({
      question: Joi.string().required(),
      answer: Joi.string().required(),
    }).required()
  ),
}).required();

async function createCardBox(req: NextApiRequest, res: NextApiResponse) {
  const parsedBody = JSON.parse(req.body);
  const { error } = schema.validate(parsedBody);

  if (error) {
    return res.status(400).json({ message: error });
  }

  const session = await getServerSession(req, res, authOptions);
  const { boxName, cards } = parsedBody;

  if (!session?.user?.email) return res.status(401).json({});

  const { id } = await prisma.cardBox.create({
    data: {
      boxName,
      cards: {
        create: cards,
      },
      creator: {
        connect: {
          email: session.user.email,
        },
      },
      users: {
        connect: {
          email: session.user.email,
        },
      },
    },
  });

  return res.status(200).json({ id });
}

async function fetchCardBoxes(req: NextApiRequest, res: NextApiResponse) {
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
