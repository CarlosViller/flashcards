import Header from "@/components/shared/Header";
import { CardBoxWithCards } from "@/types";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Root() {
  const { data: session } = useSession();
  const [cards, setCards] = useState<Array<CardBoxWithCards>>([]);
  const router = useRouter();

  useEffect(() => {
    if (!session?.user) router.push("/");
    fetch("/api/cardBox")
      .then((res) => res.json())
      .then((payload) => setCards(payload));
  }, []);

  if (session?.user?.email) {
    return (
      <>
        <Header />
        <h1>Cajas</h1>
        {cards.map((cards) => (
          <a key={cards.id} href={`/boxes/${cards.id}`}>{cards.boxName}</a>
        ))}
      </>
    );
  }

  return <p>sada</p>;
}
