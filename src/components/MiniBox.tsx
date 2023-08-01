import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CardBox } from "@prisma/client";
import { useRouter } from "next/router";
import React from "react";

type Props = {
  box: CardBox;
};

export default function MiniBox({ box }: Props) {
  const router = useRouter();

  async function handleDisconnect() {
    const res = await fetch(`/api/cardBox/${box.id}`, {
      method: "DELETE",
      body: JSON.stringify({ id: box.id }),
    });

    if (!res.ok) {
      console.error(res);
    }
  }

  return (
    <div className="relative minibox">
      <article className=" relative h-full p-6 border-2 border-primary rounded-md m-4">
        <a href={`/boxes/${box.id}`} className="">
          {box.boxName}
        </a>
      </article>
      <button
        onClick={handleDisconnect}
        className=" absolute top-0 right-0 aspect-square rounded-full bg-red-600 w-[35px] flex items-center justify-center"
      >
        <FontAwesomeIcon className="text-white" icon={faMinus} />
      </button>
    </div>
  );
}
