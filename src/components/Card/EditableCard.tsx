import { NewCard } from "@/pages/create";
import { useEffect, useRef } from "react";

type Props = {
  card: NewCard;
  currentCardIndex: number;
  flip: boolean;
  setCards: React.Dispatch<React.SetStateAction<Array<NewCard>>>;
};

export default function EditableCard({
  card,
  currentCardIndex,
  flip,
  setCards,
}: Props) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    cardRef?.current?.classList.remove("flip");
    setTimeout(() => cardRef?.current?.classList.add("flip"), 0);
  }, [flip]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    let newValue: NewCard;

    if (e.target.id === "question-input") {
      newValue = {
        question: e.target.value,
        answer: card.answer,
      };
    } else {
      newValue = {
        question: card.question,
        answer: e.target.value,
      };
    }

    setCards((prevState) => {
      return prevState.map((value, index) =>
        index === currentCardIndex ? newValue : value
      );
    });
  }

  return (
    <div>
      <div
        ref={cardRef}
        className={`border-2 rounded flex min-w-[550px] min-h-[280px] items-center justify-center max-w-lg py-3 ${
          flip ? "border-primary" : ""
        }`}
      >
        {flip ? (
          <input
            id="question-input"
            value={card.question}
            onChange={handleChange}
          />
        ) : (
          <input
            id="answer-input"
            value={card.answer}
            onChange={handleChange}
          />
        )}
      </div>
    </div>
  );
}
