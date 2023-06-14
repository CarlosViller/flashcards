import { Card, CardBox } from "@prisma/client";

export type CardBoxWithCards = CardBox & {
  cards: Card[];
};