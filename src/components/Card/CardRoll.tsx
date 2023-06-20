import { NewCard } from "@/pages/create";
import EditableCard from "./EditableCard";
import { useEffect } from "react";

type Props = {
  cards: NewCard[];
  flip: boolean;
  currentCard: number;
  setCurrentCard: React.Dispatch<React.SetStateAction<number>>;
  setCards: React.Dispatch<React.SetStateAction<Array<NewCard>>>;
};

export default function CardRoll({
  cards,
  flip,
  currentCard,
  setCurrentCard,
  setCards,
}: Props) {
  const goPrev = () =>
    setCurrentCard((prevPosition) => {
      const current = prevPosition - 1;
      return current > 0 ? current : 0;
    });

  const goNext = () => {
    const current = currentCard + 1;

    if (!cards[current]) {
      setCards((prevCards) => [
        ...prevCards,
        {
          question: `hola ${currentCard}`,
          answer: `chao ${currentCard}`,
        },
      ]);
    }
    setCurrentCard(current);
  };

  return (
    <div className="flex">
      <button onClick={goPrev}>
        <span className="material-symbols-outlined nav-card-button">navigate_before</span>
      </button>
      <EditableCard card={cards[currentCard]} flip={flip} />
      <button onClick={goNext}>
        <span className="material-symbols-outlined nav-card-button">navigate_next</span>
      </button>
    </div>
  );
}
