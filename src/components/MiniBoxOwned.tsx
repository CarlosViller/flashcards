import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CardBox } from "@prisma/client";
import Link from "next/link";
import React from "react";
import MiniBoxAction from "./shared/MiniBoxAction";
import StartButton from "./StartButton";

type Props = {
  box: CardBox;
  handleDisconnect: (boxId: number) => Promise<void>;
};

export default function MiniBoxOwned({ box, handleDisconnect }: Props) {
  return (
    <div className="relative minibox">
      <article className="flex flex-col justify-between items-center relative h-full p-6 border-2 gap-8 border-primary rounded-md">
        <Link href={`/boxes/${box.id}`}>{box.boxName}</Link>
        <StartButton id={box.id} />
      </article>
      <MiniBoxAction onClick={() => handleDisconnect(box.id)} variant="remove">
        <FontAwesomeIcon className="text-white" icon={faMinus} />
      </MiniBoxAction>
    </div>
  );
}
