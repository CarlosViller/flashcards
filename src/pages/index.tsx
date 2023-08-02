import GridSection from "@/components/shared/GridSection";
import MiniBoxOwned from "@/components/MiniBoxOwned";
import Header from "@/components/shared/Header";
import { CardBoxWithCards } from "@/types";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next";

export default function Root() {
  const [boxes, setBoxes] = useState<Array<CardBoxWithCards>>([]);

  useEffect(() => {
    fetch("/api/cardBox")
      .then((res) => res.json())
      .then((payload) => setBoxes(payload));
  }, []);

  return (
    <>
      <Header />
      <GridSection title="Your boxes">
        {boxes.map((box) => (
          <MiniBoxOwned key={box.id} box={box} />
        ))}
      </GridSection>
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
