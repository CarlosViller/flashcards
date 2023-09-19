import { Card as CardT } from "@prisma/client";
import { useEffect, useRef, useState } from "react";

type Props = {
  card: CardT;
};

export default function Card({ card }: Props) {
  const [flip, setFlip] = useState(false);
  const cardRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    cardRef?.current?.classList.remove("flip");
    setTimeout(() => cardRef?.current?.classList.add("flip"), 0);
  }, [flip]);

  return (
    <button
      ref={cardRef}
      onClick={() => setFlip((prevState) => !prevState)}
      type="button"
      className={`border-2 rounded flex text-sm px-1 w-[300px] h-[350px] lg:h-[280px] lg:w-full items-center justify-center py-3 ${
        flip ? "border-primary" : ""
      }`}
    >
      {flip ? card.answer : card.question}
    </button>
  );
}
