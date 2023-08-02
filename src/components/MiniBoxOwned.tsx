import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CardBox } from "@prisma/client";
import Link from "next/link";
import React from "react";

type Props = {
  box: CardBox;
};

export default function MiniBoxOwned({ box }: Props) {
  async function handleDisconnect() {
    const res = await fetch(`/api/cardBox/connection}`, {
      method: "DELETE",
      body: JSON.stringify({ boxId: box.id }),
    });

    if (!res.ok) {
      console.error(res);
    }
  }

  return (
    <div className="relative minibox">
      <article className="flex flex-col justify-between items-center relative h-full p-6 border-2 gap-8 border-primary rounded-md">
        <a href={`/boxes/${box.id}`}>{box.boxName}</a>
        <Link
          href={`/study?boxId=${box.id}`}
          className="start-study-btn btn-primary"
        >
          Start
        </Link>
      </article>
      <button
        onClick={handleDisconnect}
        className=" absolute top-[-10px] right-[-10px] aspect-square rounded-full bg-red-600 w-[35px] flex items-center justify-center"
      >
        <FontAwesomeIcon className="text-white" icon={faMinus} />
      </button>
    </div>
  );
}
