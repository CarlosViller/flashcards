import { ToastContext } from "@/ToastContext";
import CardRoll from "@/components/Card/CardRoll";
import Header from "@/components/shared/Header";
import Input from "@/components/shared/Input";
import { CardBoxWithCards } from "@/types";
import { GetServerSidePropsContext } from "next";
import { DefaultSession } from "next-auth";
import { getSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";

type Props = {
  boxId: number;
  currentUser: DefaultSession
};

export default function EditPage({ boxId, currentUser }: Props) {
  const [box, setBox] = useState<CardBoxWithCards>();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const { notifyError } = useContext(ToastContext);
  
  useEffect(() => {
    async function fetchBoxWithId() {
      const res = await fetch(`/api/cardBox/${boxId}`);
      if (!res.ok) console.error(res);

      const payload = await res.json();

      if (!payload) console.log(payload);

      setBox(payload);
      // setLoading(false);
    }
    fetchBoxWithId();
  }, [boxId]);

  if(!box) {
    return (
      <>
      <Header />
      <h1>Box not found</h1>
      </>
    )
  }

  if (currentUser.user?.email !== box?.creatorEmail) {
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
          <Input value={box.boxName} setValue={(value) => {
            setBox((prevState) => {
              return {...prevState, boxName: value }
            })
          }} />
        </div>
        <CardRoll
          setCards={(value) => setBox((prevState) => ({
            ...prevState, cards: value
          }))}
          currentCardIndex={currentCardIndex}
          setCurrentCardIndex={setCurrentCardIndex}
          cards={box.cards}
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
