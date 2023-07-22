import prisma from "@/backend/prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export async function deleteCardWithId(req: NextApiRequest, res: NextApiResponse, id: string) {

  console.log(id)
  try {
    await prisma.cardBox.delete({
      where: {
        id: Number(id)
      }
    })
    return res.end()
  } catch (error) {
    return res.status(500).json(error)
  }
}