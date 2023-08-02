import GridSection from "@/components/shared/GridSection";
import MiniBoxSearchItem from "@/components/MiniBoxSearchItem";
import Header from "@/components/shared/Header";
import { CardBoxWithCardsAndUsers, SessionProps } from "@/types";
import { GetServerSidePropsContext } from "next";
import { getSession, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface Props extends SessionProps {
  query: string;
}

export default function SearchPage({ query, session }: Props) {
  const [boxes, setBoxes] = useState<Array<CardBoxWithCardsAndUsers>>([]);

  useEffect(() => {
    fetch(`/api/cardBox/search?q=${query}`)
      .then((res) => res.json())
      .then((payload) => setBoxes(payload));
  }, [query]);

  if (session?.user?.email) {
    return (
      <>
        <Header />
        <GridSection title={query}>
          {boxes.map((box) => (
            <MiniBoxSearchItem key={box.id} box={box} />
          ))}
        </GridSection>
      </>
    );
  }
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);
  const { q } = context.query;

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return { props: { query: q, session } };
}
