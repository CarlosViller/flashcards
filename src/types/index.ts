import { Card, CardBox } from "@prisma/client";
import { Session } from "next-auth";

export type CardBoxWithCards = CardBox & {
  cards: Card[];
};

export type CardBoxWithCardsAndUsers = CardBoxWithCards & {
  users: Array<{ email: string }>;
};

export interface SessionProps {
  session: Session;
}
