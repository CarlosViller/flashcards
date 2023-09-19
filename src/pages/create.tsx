import { ToastContext } from "@/ToastContext";
import CardRoll from "@/components/Card/CardRoll";
import Input from "@/components/shared/Input";
import { Card } from "@/types";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

export default function CreateBox() {
  const [boxName, setBoxName] = useState("");
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const router = useRouter();
  const toast = useContext(ToastContext);

  const [cards, setCards] = useState<Array<Card>>([
    { question: "", answer: "" },
  ]);

  async function handleCreate() {
    const res = await fetch("/api/cardBox", {
      method: "POST",
      body: JSON.stringify({ boxName, cards }),
    });

    if (!res.ok) {
      toast.notifyError("An error occurred while creating the card box");
      return;
    }

    const { id } = await res.json();

    toast.notifySuccess("Box created successfully");
    router.push(`/boxes/${id}`);
  }

  return (
    <>
      <section className="container flex flex-col items-center mx-auto gap-6 page">
        <div className="text-center">
          <h2>Box name</h2>
          <Input value={boxName} setValue={setBoxName} />
        </div>
        <CardRoll
          setCards={setCards}
          currentCardIndex={currentCardIndex}
          setCurrentCardIndex={setCurrentCardIndex}
          cards={cards}
        />
        <button
          className="primary submit-box-btn"
          disabled={
            boxName === "" ||
            (cards.length === 1 &&
              (cards[0].question === "" || cards[0].answer === ""))
          }
          onClick={handleCreate}
        >
          Create box
        </button>
      </section>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
