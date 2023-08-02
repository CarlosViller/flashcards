import CardRoll from "@/components/Card/CardRoll";
import Header from "@/components/shared/Header";
import Input from "@/components/shared/Input";
import { getRandomCardPlaceholder } from "@/utils";
import { useState } from "react";

export type NewCard = {
  question: string;
  answer: string;
};

export default function CreateBox() {
  const [boxName, setBoxName] = useState("");
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const [cards, setCards] = useState<Array<NewCard>>([
    { question: "", answer: "" },
  ]);

  return (
    <>
      <Header />
      <section className="container flex flex-col items-center mx-auto gap-6 mt-10">
        <div className="text-center">
          <h2>Name of the box</h2>
          <Input value={boxName} setValue={setBoxName} />
        </div>
        <CardRoll
          setCards={setCards}
          currentCardIndex={currentCardIndex}
          setCurrentCardIndex={setCurrentCardIndex}
          cards={cards}
        />
        <button
          className="primary"
          disabled={boxName === ""}
          onClick={() =>
            fetch("/api/cardBox", {
              method: "POST",
              body: JSON.stringify({ boxName, cards }),
            })
          }
        >
          Send
        </button>
      </section>
    </>
  );
}
