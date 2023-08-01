import MiniBox from "@/components/MiniBox";
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
  }, []);

  if (session?.user?.email) {
    return (
      <>
        <Header />
        <section className="px-6 mt-4">
          <h1>Cajas</h1>
          <div className="flex gap-4">
            {boxes.map((box) => (
              <MiniBox key={box.id} box={box} />
            ))}
          </div>
        </section>
      </>
    );
  }

  return <p>sada</p>;
}
