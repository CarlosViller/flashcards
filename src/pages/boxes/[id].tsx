import Spinner from "@/components/shared/Spinner";
import { CardBoxWithCards } from "@/types";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  boxId: string;
};

export default function BoxPage({ boxId }: Props) {
  const [box, setBox] = useState<CardBoxWithCards | null>(null);
  const [loading, setLoading] = useState(true);
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
  }, []);

  async function handleClick() {
    const res = await fetch(`/api/cardBox/${boxId}`, {
      method: "DELETE",
      body: JSON.stringify({ id: boxId }),
    });

    if (!res.ok) {
      console.error(res);
    }

    router.push("/");
  }

  if (loading) return <Spinner />;

  return (
    <div>
      <p>Nombre</p>
      <p>{box.boxName}</p>
      <div>
        <button onClick={handleClick}>Delete</button>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.query;

  return { props: { boxId: id } };
}
