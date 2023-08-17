import GridSection from "@/components/shared/GridSection";
import MiniBoxOwned from "@/components/MiniBoxOwned";
import Header from "@/components/shared/Header";
import { CardBoxWithCards } from "@/types";
import { useContext, useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next";
import { ToastContext } from "@/ToastContext";
import Loading from "@/components/shared/Loading";

export default function Root() {
  const [boxes, setBoxes] = useState<Array<CardBoxWithCards>>([]);
  const { notifyError } = useContext(ToastContext);
  const [loading, setLoading] = useState(true);

  async function fetchBoxes() {
    setLoading(true);
    const res = await fetch("/api/cardBox");

    if (!res.ok) {
      notifyError("Unexpected Error");
    } else {
      setBoxes(await res.json());
    }

    setLoading(false);
    return;
  }
  
  async function handleDisconnect(boxId: number) {
    const res = await fetch(`/api/cardBox/connection`, {
      method: "PUT",
      body: JSON.stringify({ boxId }),
    });

    if (!res.ok) {
      notifyError("Cannot disconnect box");
      return;
    }

    await fetchBoxes();
  }

  useEffect(() => {
    fetchBoxes();
  }, []);


  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Header />
      {boxes.length > 0 ? (
        <GridSection title="Your boxes">
          {boxes.map((box) => (
            <MiniBoxOwned
              key={box.id}
              box={box}
              handleDisconnect={handleDisconnect}
            />
          ))}
        </GridSection>
      ) : (
        <h1 className="text-center mt-12">{`You don't have any card boxes, start creating ones with the create button!`}</h1>
      )}
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
