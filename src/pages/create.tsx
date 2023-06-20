import CardRoll from "@/components/Card/CardRoll";
import Header from "@/components/shared/Header";
import Input from "@/components/shared/Input";
import { useState } from "react";

export type NewCard = {
  question: string;
  answer: string;
};

export default function CreateBox() {
  const [boxName, setBoxName] = useState("");
  const [cards, setCards] = useState<Array<NewCard>>([
    { question: "placeholder", answer: "holderplace" },
  ]);
  const [currentCard, setCurrentCard] = useState(0);
  const [flip, setFlip] = useState(false);
  const flipCard = () => setFlip((prevState) => !prevState);

  return (
    <div className="flex flex-col gap-2">
      <Header />
      <div className="container flex flex-col items-center mx-auto gap-6">
        <div className="text-center">
          <h2>Name of the box</h2>
          <Input value={boxName} setValue={setBoxName} />
        </div>
        <CardRoll
          setCards={setCards}
          currentCard={currentCard}
          setCurrentCard={setCurrentCard}
          cards={cards}
          flip={flip}
        />
        <div>
          <button
            onClick={flipCard}
            className=" rounded bg-green_primary px-3 py-1 text-white"
          >
            Flip
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * Card with placeholder and a button to flip the card, give it a short grow and shrink animation and change the placehodler to be write your answer, user can flip the card as many times they want. Render another button to go to next card, give it a animation or something to let the user know this is a new card, the user can also move through cards and can delete it, delete button doesn't render if there's one card only
 */
