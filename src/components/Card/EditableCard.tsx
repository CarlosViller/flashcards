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
        className={`border-2 rounded flex min-w-[550px] min-h-[280px] items-center justify-center max-w-lg py-3 ${
          flip ? "border-primary" : ""
        }`}
      >
        {flip ? card.answer : card.question}
      </div>
    </div>
  );
}
