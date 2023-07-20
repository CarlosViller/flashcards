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
        Signed in as {session.user.email} <br />
        <h1>Cajas</h1>
        {cards.map((cards) => (
          <p key={cards.boxName}>{cards.boxName}</p>
        ))}
      </>
    );
  }

  return <p>sada</p>;
}
