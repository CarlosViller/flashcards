import { Card } from "@prisma/client";
import { useState } from "react";

type Props = {
  card: Card;
};

export default function Card({ card }: Props) {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <button
      onClick={() => setShowAnswer((prevState) => !prevState)}
      type="button"
    >
      <div
        className={`border-2 rounded flex items-center justify-center max-w-lg py-3 ${
          showAnswer ? "border-green-600" : ""
        }`}
      >
        {showAnswer ? card.answer : card.question}
      </div>
    </button>
  );
}
