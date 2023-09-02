import { CardBox } from "@prisma/client";
import React from "react";

type Props = {
  box: CardBox;
};

export default function MiniBox({ box }: Props) {
  return (
    <div className="relative minibox">
      <article className="flex flex-col justify-between items-center relative h-full p-6 border-2 gap-8 border-primary rounded-md">
        <a href={`/boxes/${box.id}`}>{box.boxName}</a>
      </article>
    </div>
  );
}
