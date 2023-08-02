import GridSection from "@/components/shared/GridSection";
import MiniBoxSearchItem from "@/components/MiniBoxSearchItem";
import Header from "@/components/shared/Header";
import { CardBoxWithCardsAndUsers } from "@/types";
import { GetServerSidePropsContext } from "next";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function SearchPage({ query }: { query: string }) {
  const { data: session } = useSession();
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
  const { q } = context.query;

  return { props: { query: q } };
}
