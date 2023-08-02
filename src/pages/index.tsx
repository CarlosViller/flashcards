import MiniBoxGrid from "@/components/MiniBoxGrid";
import MiniBoxOwned from "@/components/MiniBoxOwned";
import Header from "@/components/shared/Header";
import { CardBoxWithCards } from "@/types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Root() {
  const { data: session } = useSession();
  const [boxes, setBoxes] = useState<Array<CardBoxWithCards>>([]);
  const router = useRouter();

  useEffect(() => {
    if (!session?.user) router.push("/");
    fetch("/api/cardBox")
      .then((res) => res.json())
      .then((payload) => setBoxes(payload));
  }, [router, session?.user]);

  if (session?.user?.email) {
    return (
      <>
        <Header />
        <MiniBoxGrid title="Your boxes">
          {boxes.map((box) => (
            <MiniBoxOwned key={box.id} box={box} />
          ))}
        </MiniBoxGrid>
      </>
    );
  }

  return <p>sada</p>;
}
