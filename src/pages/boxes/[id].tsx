import prisma from "@/backend/prisma/client";
import Card from "@/components/Card/Card";
import Header from "@/components/shared/Header";
import Spinner from "@/components/shared/Spinner";
import { CardBoxWithCards } from "@/types";
import { GetServerSidePropsContext } from "next";
import { getSession, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  boxId: string;
  connectedUsers: Array<{ email: string }>;
};

export default function BoxPage({ boxId, connectedUsers }: Props) {
  const [box, setBox] = useState<CardBoxWithCards | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    async function fetchBoxWithId() {
      const res = await fetch(`/api/cardBox/${boxId}`);
      if (!res.ok) console.error(res);

      const payload = await res.json();

      if (!payload) console.log(payload);

      setBox(payload);
      setLoading(false);
    }
    fetchBoxWithId();
  }, [boxId]);

  async function handleRemove() {
    const res = await fetch(`/api/cardBox/connection`, {
      method: "PUT",
      body: JSON.stringify({ id: boxId }),
    });

    if (!res.ok) {
      console.error(res);
      return;
    }

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

  if (loading) return <Spinner />;

  if (!box) return <p>bad id</p>;

  return (
    <>
      <Header />
      <section className="px-6 mt-4">
        <h1 className="text-2xl text-primary text-center">{box.boxName}</h1>
        <section className="flex gap-4">
          {connectedUsers.some(
            (user) => user.email === session?.user?.email
          ) ? (
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
  let connectedUsers: Array<{ email: string }> = [];

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const data = await prisma.cardBox.findUnique({
    where: {
      id: Number(id),
    },
    select: {
      users: {
        select: {
          email: true,
        },
      },
    },
  });

  if (data) {
    connectedUsers = data.users;
  }

  return { props: { boxId: id, connectedUsers } };
}
