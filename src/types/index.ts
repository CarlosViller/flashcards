import { Card, CardBox } from "@prisma/client";

export type CardBoxWithCards = CardBox & {
  cards: Card[];
};

export type CardBoxWithCardsAndUsers = CardBoxWithCards & {
  users: Array<{ email: string }>;
};
