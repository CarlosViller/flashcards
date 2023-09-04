import { Card as CardT, CardBox } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export type CardBoxWithCards = CardBox & {
  cards: CardT[];
};

export type CardBoxWithCardsAndUsers = CardBoxWithCards & {
  users: Array<{ email: string }>;
};

export interface SessionUser {
  user: {
    name: string;
    email: string;
    image: string;
  };
}

export type Card = {
  question: string;
  answer: string;
};
