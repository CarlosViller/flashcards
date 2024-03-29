import GridSection from "@/components/shared/GridSection";
import MiniBoxSearchItem from "@/components/MiniBoxSearchItem";
import { CardBoxWithCardsAndUsers } from "@/types";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import { ToastContext } from "@/ToastContext";
import { useRouter } from "next/router";
import Loading from "@/components/shared/Loading";
import Link from "next/link";

interface Props {
  query: string;
}

export default function SearchPage({ query }: Props) {
  const [boxes, setBoxes] = useState<Array<CardBoxWithCardsAndUsers>>([]);
  const { notifyError, notifySuccess } = useContext(ToastContext);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchBoxes = async () => {
    const res = await fetch(`/api/cardBox/search?q=${query}`);

    if (!res.ok) {
      notifyError("Unexpected Error");
    } else {
      setBoxes(await res.json());
    }
    setLoading(false);
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

  if (loading) return <Loading />;

  return (
    <section className="page">
      {boxes.length !== 0 ? (
        <GridSection title={query}>
          {boxes.map((box) => (
            <MiniBoxSearchItem
              key={box.id}
              box={box}
              handleConnect={handleConnect}
            />
          ))}
        </GridSection>
      ) : (
        <section className="flex flex-col items-center justify-center gap-2">
          <h1 className="text-center mt-10 text-lg">
            {`No boxes found for ${query}`}
            <br />
            you can create the first box for this!
          </h1>
          <Link
            href="/create"
            className="create-button text-primary px-4 py-1 rounded-md border-primary border-2"
          >
            Create
          </Link>
        </section>
      )}
    </section>
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
