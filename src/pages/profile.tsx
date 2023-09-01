import { ToastContext } from "@/ToastContext";
import MiniBoxOwned from "@/components/MiniBoxOwned";
import GridSection from "@/components/shared/GridSection";
import Header from "@/components/shared/Header";
import Loading from "@/components/shared/Loading";
import ProfilePic from "@/components/shared/ProfilePic";
import { CardBoxWithCards, SessionUser } from "@/types";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import { useCallback, useContext, useEffect, useState } from "react";

export default function Profile({ user }: SessionUser) {
  const { notifyError } = useContext(ToastContext);
  const [loading, setLoading] = useState(true);
  const [boxes, setBoxes] = useState<CardBoxWithCards[]>([]);

  const fetchBoxes = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/cardBox");

    if (!res.ok) {
      notifyError("Unexpected Error");
    } else {
      setBoxes(await res.json());
    }

    setLoading(false);
    return;
  }, [notifyError]);

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
  }, [fetchBoxes]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <Header />
      <div className="flex flex-col items-center pt-10 text-center gap-4 container mx-auto">
        <ProfilePic size={100} />
        <div>
          <h1 className="text-2xl">{user.name}</h1>
          <small>{user.email}</small>
        </div>
        <div className="flex justify-between gap-10">
          <div className="flex flex-col">
            {loading ? (
              <Loading />
            ) : (
              <>
                <h2 className="text-xl font-medium">Boxes</h2>
                <GridSection>
                  {boxes.map((box) => (
                    <MiniBoxOwned
                      key={box.id}
                      box={box}
                      handleDisconnect={handleDisconnect}
                    />
                  ))}
                </GridSection>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);

  if (!session?.user?.email) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { user: session.user },
  };
}
