import { Card } from "@/types";
import { getRandomCardPlaceholder } from "@/utils";
import { useEffect, useMemo, useRef } from "react";

type Props = {
  card: Card;
  currentCardIndex: number;
  flip: boolean;
  setCards: React.Dispatch<React.SetStateAction<Array<Card>>>;
};

export default function EditableCard({
  card,
  currentCardIndex,
  flip,
  setCards,
}: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const placeholder = useMemo(() => getRandomCardPlaceholder(), [currentCardIndex])

  useEffect(() => {
    cardRef?.current?.classList.remove("flip");
    setTimeout(() => cardRef?.current?.classList.add("flip"), 0);
  }, [flip]);

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    let newValue: Card;

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
    <div
      ref={cardRef}
      className={`border-2 rounded flex lg:w-[550px] lg:h-[280px] w-[300px] h-[350px] items-center justify-center  py-3 ${
        flip ? "border-primary" : ""
      }`}
    >
      {!flip ? (
        <textarea
          className="resize-none text-center align-middle overflow-hidden"
          id="question-input"
          rows={6}
          cols={20}
          maxLength={150}
          placeholder={placeholder.question}
          value={card.question}
          onChange={handleChange}
        />
      ) : (
        <textarea
          className="resize-none text-center align-middle overflow-hidden"
          id="answer-input"
          rows={6}
          cols={20}
          maxLength={150}
          placeholder={placeholder.answer}
          value={card.answer}
          onChange={handleChange}
        />
      )}
    </div>
  );
}
