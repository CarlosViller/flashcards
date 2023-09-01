import GridSection from "@/components/shared/GridSection";
import MiniBoxSearchItem from "@/components/MiniBoxSearchItem";
import Header from "@/components/shared/Header";
import { CardBoxWithCardsAndUsers } from "@/types";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import { ToastContext } from "@/ToastContext";
import { useRouter } from "next/router";

interface Props {
  query: string;
}

export default function SearchPage({ query }: Props) {
  const [boxes, setBoxes] = useState<Array<CardBoxWithCardsAndUsers>>([]);
  const { notifyError, notifySuccess } = useContext(ToastContext);
  const router = useRouter();

  const fetchBoxes = async () => {
    const res = await fetch(`/api/cardBox/search?q=${query}`);

    if (!res.ok) {
      notifyError("Unexpected Error");
      return;
    }

    setBoxes(await res.json());
  };

  useEffect(() => {
    fetchBoxes();
  }, [query]);

  async function handleConnect(boxId: number) {
    const res = await fetch(`/api/cardBox/connection`, {
      method: "POST",
      body: JSON.stringify({ boxId }),
    });

    if (!res.ok) {
      notifyError("Cannot make a copy");
      return;
    }

    const { boxId: newBoxId } = await res.json();

    router.push(`/boxes/${newBoxId}`);
    notifySuccess("Box copy successfully");
  }

  return (
    <>
      <Header />
      <GridSection title={query}>
        {boxes.map((box) => (
          <MiniBoxSearchItem
            key={box.id}
            box={box}
            handleConnect={handleConnect}
          />
        ))}
      </GridSection>
    </>
  );
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

  return { props: { query: q } };
}
