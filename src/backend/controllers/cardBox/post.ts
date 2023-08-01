import prisma from "@/backend/prisma/client";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Joi from "joi";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

const schema = Joi.object({
  boxName: Joi.string().required(),
  cards: Joi.array().items(
    Joi.object({
      question: Joi.string().required(),
      answer: Joi.string().required(),
    }).required()
  ),
}).required();

export async function createCardBox(req: NextApiRequest, res: NextApiResponse) {
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
          email: session.user.email
        }
      },
      users: {
        connect: {
          email: session.user.email,
        },
      },
    },
  });

  return res.status(200).json(id);
}
