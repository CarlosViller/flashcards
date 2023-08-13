import { Card as CardT, CardBox } from "@prisma/client";
import { Session } from "next-auth";

export type CardBoxWithCards = CardBox & {
  cards: CardT[];
};

export type CardBoxWithCardsAndUsers = CardBoxWithCards & {
  users: Array<{ email: string }>;
};

export interface SessionProps {
  session: Session;
}

export type SessionUser = {
  name: string;
  email: string;
  image: string;
};

export type Card = {
  question: string;
  answer: string;
};
