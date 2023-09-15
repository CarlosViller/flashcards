import Card from "@/components/Card/Card";
import Header from "@/components/shared/Header";
import Spinner from "@/components/shared/Spinner";
import { MAX_CARDS } from "@/constants";
import { CardBoxWithCards } from "@/types";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";

interface Props {
  boxId: string;
}

export default function StudyPage({ boxId }: Props) {
  const [box, setBox] = useState<CardBoxWithCards>();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const currentCard = useMemo(() => currentCardIndex + 1, [currentCardIndex]);

  const goPrev = () => {
    setCurrentCardIndex((prevPosition) => prevPosition - 1);
  };

  const goNext = () => {
    setCurrentCardIndex(currentCardIndex + 1);
  };

  useEffect(() => {
    async function getBox() {
      await fetch(`/api/cardBox/${boxId}`)
        .then((res) => res.json())
        .then((payload) => setBox(payload));
    }

    getBox();
  }, [boxId]);

  if (!box) return <Spinner />;

  return (
    <>
      <section className="flex gap-4 justify-center items-center relative py-2 mt-10">
        <button
          className="nav-card-button disabled:text-gray-300 text-black"
          onClick={goPrev}
          disabled={currentCard === 1}
        >
          <FontAwesomeIcon icon={faArrowLeft} className="text-inherit" />
        </button>
        <Card card={box.cards[currentCardIndex]} />
        <button
          className="nav-card-button disabled:text-gray-300 text-black"
          onClick={goNext}
          disabled={
            currentCard === MAX_CARDS || currentCard === box.cards.length
          }
        >
          <FontAwesomeIcon
            icon={faArrowRight}
            className="text-inherit"
            size="1x"
          />
        </button>
      </section>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);
  const { boxId } = context.query;

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return { props: { boxId } };
}
