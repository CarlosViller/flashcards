import EditableCard from "./EditableCard";
import { useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClose,
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { MAX_CARDS } from "@/constants";
import { Card } from "@/types";

type Props = {
  cards: Card[];
  currentCardIndex: number;
  setCurrentCardIndex: React.Dispatch<React.SetStateAction<number>>;
  setCards: React.Dispatch<React.SetStateAction<Array<Card>>>;
};

export default function CardRoll({
  cards,
  currentCardIndex,
  setCurrentCardIndex,
  setCards,
}: Props) {
  const currentCard = useMemo(() => currentCardIndex + 1, [currentCardIndex]);
  const [flip, setFlip] = useState(false);

  const flipCard = () => setFlip((prevState) => !prevState);

  const isCurrentCardFilled = () =>
    cards[currentCardIndex].answer.length > 0 &&
    cards[currentCardIndex].question.length > 0;

  const goPrev = () => {
    setCurrentCardIndex((prevPosition) => {
      const current = prevPosition - 1;
      return current > 0 ? current : 0;
    });
    setFlip(false);
  };

  const goNext = () => {
    if (!cards[currentCard]) {
      setCards((prevCards) => [...prevCards, { question: "", answer: "" }]);
    }
    setCurrentCardIndex(currentCardIndex + 1);
    setFlip(false);
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
    setFlip(false);
  };

  return (
    <div className="text-center">
      <div className="flex gap-2 justify-center items-center relative py-2">
        {cards.length > 1 && (
          <button onClick={deleteCard} className=" absolute top-0 right-0">
            <FontAwesomeIcon
              icon={faClose}
              className="text-red-600"
              size="2x"
            />
          </button>
        )}
        <button
          className="nav-card-button disabled:text-gray-300 text-black"
          onClick={goPrev}
          // Disable goPrev button if currentCard is the first of list
          disabled={currentCard === 1}
        >
          <FontAwesomeIcon
            icon={faArrowLeft}
            className="text-inherit"
            size="sm"
          />
        </button>
        <EditableCard
          card={cards[currentCardIndex]}
          currentCardIndex={currentCardIndex}
          setCards={setCards}
          flip={flip}
        />
        <button
          className="nav-card-button disabled:text-gray-300 text-black"
          onClick={goNext}
          disabled={currentCard === MAX_CARDS || !isCurrentCardFilled()}
        >
          <FontAwesomeIcon
            icon={faArrowRight}
            className="text-inherit"
            size="sm"
          />
        </button>
      </div>
      <p className="text-center mb-2">{`${cards.length}/${MAX_CARDS}`}</p>
      <button onClick={flipCard} className="secondary">
        Flip
      </button>
    </div>
  );
}
