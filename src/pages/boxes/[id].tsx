import { ToastContext } from "@/ToastContext";
import prisma from "@/backend/prisma/client";
import Card from "@/components/Card/Card";
import Header from "@/components/shared/Header";
import Loading from "@/components/shared/Loading";
import Spinner from "@/components/shared/Spinner";
import { CardBoxWithCards, SessionUser } from "@/types";
import { GetServerSidePropsContext } from "next";
import { getSession, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

interface Props extends SessionUser {
  boxId: string;
}

export default function BoxPage({ boxId, user }: Props) {
  const [box, setBox] = useState<CardBoxWithCards | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const notify = useContext(ToastContext);

  useEffect(() => {
    async function fetchBoxWithId() {
      const res = await fetch(`/api/cardBox/${boxId}`);
      if (!res.ok) console.error(res);

      const payload = await res.json();

      if (!payload) return;

      setBox(payload);
      setLoading(false);
    }
    fetchBoxWithId();
  }, [boxId]);

  async function handleRemove() {
    const res = await fetch(`/api/cardBox/connection`, {
      method: "PUT",
      body: JSON.stringify({ boxId }),
    });

    if (!res.ok) {
      notify.notifyError("Cannot remove box");
      return;
    }

    notify.notifySuccess("Box removed");
    router.push("/");
  }

  async function handleAdd() {
    const res = await fetch(`/api/cardBox/connection`, {
      method: "POST",
      body: JSON.stringify({ boxId: boxId }),
    });

    if (!res.ok) {
      console.error(res);
    }

    const { id } = await res.json();

    router.push(`/boxes/${id}`);
  }

  if (loading) return <Loading />;

  if (!box)
    return (
      <>
        <Header />
        <section className=" mt-6 text-center">
          <p>404</p>
          <p>Box cannot be found</p>
        </section>
      </>
    );

  return (
    <>
      <Header />
      <section className="px-6 mt-4">
        <h1 className="text-2xl text-primary text-center">{box.boxName}</h1>
        <section className="flex gap-4">
          {user.email === box.creatorEmail ? (
            <>
              <Link href={`/boxes/edit/${boxId}`}>Edit</Link>
              <button onClick={handleRemove}>Remove</button>
            </>
          ) : (
            <button onClick={handleAdd}>Add</button>
          )}
        </section>
        <section className="grid lg:grid-cols-4 grid-cols-1 gap-4 mt-6">
          {box.cards.map((card) => (
            <Card key={card.id} card={card} />
          ))}
        </section>
      </section>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.query;
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return { props: { boxId: id, user: session.user } };
}
