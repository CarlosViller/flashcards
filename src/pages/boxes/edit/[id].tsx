import { ToastContext } from "@/ToastContext";
import CardRoll from "@/components/Card/CardRoll";
import Header from "@/components/shared/Header";
import Input from "@/components/shared/Input";
import { Card, CardBoxWithCards, SessionUser } from "@/types";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

type Props = {
  boxId: number;
  currentUser: SessionUser;
};

export default function EditPage({ boxId, currentUser }: Props) {
  const [box, setBox] = useState<CardBoxWithCards>();
  const [boxName, setBoxName] = useState("");
  const [editableCards, setEditableCards] = useState<Card[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const { notifyError, notifySuccess } = useContext(ToastContext);
  const router = useRouter();

  useEffect(() => {
    async function fetchBoxWithId() {
      const res = await fetch(`/api/cardBox/${boxId}`);
      if (!res.ok) return;

      const payload: CardBoxWithCards | null = await res.json();

      if (!payload) return;

      setBox(payload);
      setBoxName(payload.boxName);
      setEditableCards(
        payload.cards.map((card) => ({
          question: card.question,
          answer: card.answer,
        }))
      );
    }
    fetchBoxWithId();
  }, [boxId]);

  async function handleSubmit() {
    const res = await fetch("/api/cardBox", {
      method: "POST",
      body: JSON.stringify({ boxName, cards: editableCards }),
    });

    if (!res.ok) {
      notifyError("Cannot save box!");
      return;
    }

    const { id } = await res.json();
    notifySuccess("Box saved!");
    router.push(`/boxes/${id}`);
  }

  if (!box) {
    return (
      <>
        <Header />
        <h1>Box not found</h1>
      </>
    );
  }

  if (currentUser.email !== box?.creatorEmail) {
    return (
      <>
        <Header />
        <div>You cannot edit this box</div>
      </>
    );
  }

  return (
    <>
      <Header />
      <section className="container flex flex-col items-center mx-auto gap-6 mt-10">
        <div className="text-center">
          <h2>Name of the box</h2>
          <Input value={box.boxName} setValue={setBoxName} />
        </div>
        <CardRoll
          setCards={setEditableCards}
          currentCardIndex={currentCardIndex}
          setCurrentCardIndex={setCurrentCardIndex}
          cards={editableCards}
        />
        <button
          className="primary"
          disabled={box.boxName === ""}
          onClick={handleSubmit}
        >
          Save
        </button>
      </section>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.query;
  const session = await getSession(context);

  if (!session?.user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return { props: { boxId: id, currentUser: session.user } };
}
