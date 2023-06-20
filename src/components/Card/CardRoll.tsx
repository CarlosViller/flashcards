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

  const deleteCard = () => {
    setCards((prevCards) => {
      if (cards.length === currentCard + 1) {
        setCurrentCard((prevCurrent) => prevCurrent - 1);
      }
      const newCards = prevCards.filter((_, index) => index !== currentCard);
      return newCards;
    });
  };

  return (
    <div className="flex gap-4 justify-center items-center relative py-4">
      {cards.length > 1 && (
        <button
          onClick={deleteCard}
          className="material-symbols-outlined scale-150 text-red-600 absolute top-0 right-0"
        >
          close
        </button>
      )}
      <button
        className="material-symbols-outlined nav-card-button"
        onClick={goPrev}
      >
        navigate_before
      </button>
      <EditableCard card={cards[currentCard]} flip={flip} />
      <button
        className="material-symbols-outlined nav-card-button"
        onClick={goNext}
      >
        navigate_next
      </button>
    </div>
  );
}
