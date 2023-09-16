import { ToastContext } from "@/ToastContext";
import Card from "@/components/Card/Card";
import StartButton from "@/components/StartButton";
import Loading from "@/components/shared/Loading";
import { CardBoxWithCards, SessionUser } from "@/types";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
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
      fetch(`/api/cardBox/${boxId}`)
        .then((res) => res.json())
        .then((data) => setBox(data))
        .catch(() => setBox(null))
        .finally(() => {
          setLoading(false);
        });
    }
    fetchBoxWithId();
  }, [boxId]);

  async function handleRemove() {
    fetch(`/api/cardBox/connection`, {
      method: "PUT",
      body: JSON.stringify({ boxId }),
    })
      .then(() => {
        notify.notifySuccess("Box removed");
        router.push("/");
      })
      .catch(() => {
        notify.notifyError("Cannot remove box");
      });
  }

  async function handleAdd() {
    fetch(`/api/cardBox/connection`, {
      method: "POST",
      body: JSON.stringify({ boxId }),
    })
      .then((res) => res.json())
      .then(({ boxId }) => {
        notify.notifyError("Box copied!");
        router.push(`/boxes/${boxId}`);
      })
      .catch(() => {
        notify.notifyError("Cannot add box");
      });
  }

  if (loading) return <Loading />;

  if (!box)
    return (
      <>
        <section className=" mt-6 text-center">
          <p>404</p>
          <p>Box cannot be found</p>
        </section>
      </>
    );

  return (
    <>
      <section className="px-6 mt-4">
        <h1 className="text-2xl text-primary text-center">{box.boxName}</h1>
        <section className="flex gap-4 items-center justify-center my-4">
          {user.email === box.creatorEmail ? (
            <>
              <StartButton id={box.id} />
              <Link className="btn-primary" href={`/boxes/edit/${boxId}`}>
                Edit
              </Link>
              <button className="btn-primary" onClick={handleRemove}>
                Remove
              </button>
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
