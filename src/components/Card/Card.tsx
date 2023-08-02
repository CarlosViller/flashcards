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
      className={`border-2 rounded flex min-w-[550px] min-h-[280px] items-center justify-center max-w-lg py-3 ${
        flip ? "border-primary" : ""
      }`}
    >
      {flip ? card.answer : card.question}
    </button>
  );
}
