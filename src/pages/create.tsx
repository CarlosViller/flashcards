import CardRoll from "@/components/Card/CardRoll";
import Header from "@/components/shared/Header";
import Input from "@/components/shared/Input";
import { useSession } from "next-auth/react";
import { useState } from "react";
import 'quill/dist/quill.bubble.css';


export type NewCard = {
  question: string;
  answer: string;
};

export default function CreateBox() {
  

  const [boxName, setBoxName] = useState("");
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  
  const [cards, setCards] = useState<Array<NewCard>>([
    { question: "placeholder", answer: "holderplace" },
  ]);

  const { data: session } = useSession();

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

/**
 * Card with placeholder and a button to flip the card, give it a short grow and shrink animation and change the placehodler to be write your answer, user can flip the card as many times they want. Render another button to go to next card, give it a animation or something to let the user know this is a new card, the user can also move through cards and can delete it, delete button doesn't render if there's one card only
 */
