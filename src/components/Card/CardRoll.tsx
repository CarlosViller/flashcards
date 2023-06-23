import { NewCard } from "@/pages/create";
import EditableCard from "./EditableCard";
import { useEffect, useMemo } from "react";

type Props = {
  cards: NewCard[];
  flip: boolean;
  currentCardIndex: number;
  setCurrentCardIndex: React.Dispatch<React.SetStateAction<number>>;
  setCards: React.Dispatch<React.SetStateAction<Array<NewCard>>>;
};

const MAX_CARDS = 10;

export default function CardRoll({
  cards,
  flip,
  currentCardIndex,
  setCurrentCardIndex,
  setCards,
}: Props) {
  const currentCard = useMemo(() => currentCardIndex + 1, [currentCardIndex]);

  const goPrev = () =>
    setCurrentCardIndex((prevPosition) => {
      const current = prevPosition - 1;
      return current > 0 ? current : 0;
    });

  const goNext = () => {
    if (!cards[currentCard]) {
      setCards((prevCards) => [
        ...prevCards,
        {
          question: `hola ${currentCard}`,
          answer: `chao ${currentCard}`,
        },
      ]);
    }
    setCurrentCardIndex(currentCardIndex + 1);
  };

  const deleteCard = () => {
    setCards((prevCards) => {
      if (cards.length === currentCard) {
        setCurrentCardIndex((prevCurrent) => prevCurrent - 1);
      }
      const newCards = prevCards.filter(
        (_, index) => index !== currentCardIndex
      );
      return newCards;
    });
  };

  return (
    <div>
      <div className="flex gap-4 justify-center items-center relative py-2">
        {cards.length > 1 && (
          <button
            onClick={deleteCard}
            className="material-symbols-outlined scale-150 text-red-600 absolute top-0 right-0"
          >
            close
          </button>
        )}
        <button
          className="material-symbols-outlined nav-card-button disabled:text-gray-300"
          onClick={goPrev}
          // Disable goPrev button if currentCard is the first of list
          disabled={currentCard === 1}
        >
          navigate_before
        </button>
        <EditableCard card={cards[currentCardIndex]} flip={flip} />
        <button
          className="material-symbols-outlined nav-card-button disabled:text-gray-300"
          onClick={goNext}
          disabled={currentCard === MAX_CARDS}
        >
          navigate_next
        </button>
      </div>
      <p className="text-center">{`${cards.length}/${MAX_CARDS}`}</p>
    </div>
  );
}
