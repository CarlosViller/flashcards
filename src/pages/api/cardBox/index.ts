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
  } else if (req.method === "PUT") {
    return updateCardBox(req, res);
  }

  return res.status(400).json({ message: "Bad request" });
}

const schemaPut = Joi.object({
  boxName: Joi.string().required(),
  cards: Joi.array().items(
    Joi.object({
      question: Joi.string().required(),
      answer: Joi.string().required(),
    }).required()
  ),
  boxId: Joi.string().required(),
}).required();

async function updateCardBox(req: NextApiRequest, res: NextApiResponse) {
  const parsedBody = JSON.parse(req.body);
  const { error } = schemaPut.validate(parsedBody);

  if (error) {
    return res.status(400).json({ message: error });
  }

  const session = await getServerSession(req, res, authOptions);
  const { boxName, cards } = parsedBody;

  if (!session?.user?.email) return res.status(401).json({});

  const [_, cardBox] = await prisma.$transaction([
    prisma.cardBox.update({
      where: { id: Number(parsedBody.boxId) },
      data: {
        cards: {
          deleteMany: { boxId: Number(parsedBody.boxId) },
        },
      },
    }),
    prisma.cardBox.update({
      where: { id: Number(parsedBody.boxId) },
      data: {
        boxName,
        cards: {
          create: cards,
        },
      },
      include: {
        cards: true,
      },
    }),
  ]);

  return res.status(200).json({id: cardBox.id});
}

const schemaPost = Joi.object({
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
  const { error } = schemaPost.validate(parsedBody);

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
