import { NewCard } from "@/pages/create";
import { useEffect, useRef } from "react";

type Props = {
  card: NewCard;
  flip: boolean;
};

export default function EditableCard({ card, flip }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    cardRef?.current?.classList.remove("flip");
    setTimeout(() => {
      cardRef?.current?.classList.add("flip");
    }, 0);
  }, [flip]);

  return (
    <div>
      <div
        ref={cardRef}
        className={`border-2 rounded flex items-center justify-center max-w-lg py-3 ${
          flip ? "border-green_primary" : ""
        }`}
      >
        {flip ? card.answer : card.question}
      </div>
    </div>
  );
}
