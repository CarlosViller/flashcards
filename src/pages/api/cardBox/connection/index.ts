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

  console.log(parsedBody)

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
            id: Number(parsedBody.boxId),
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
            id: Number(parsedBody.boxId),
          },
        },
      },
    });
  }

  return res.json({ success: true });
}
