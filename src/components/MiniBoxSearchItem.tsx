import { CardBoxWithCardsAndUsers } from "@/types";
import { faCheck, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

type Props = {
  box: CardBoxWithCardsAndUsers;
};

export default function MiniBoxSearchItem({ box }: Props) {
  const { data: session } = useSession();
  const router = useRouter();

  async function handleConnect() {
    const res = await fetch(`/api/cardBox/connection`, {
      method: "POST",
      body: JSON.stringify({ boxId: box.id }),
    });

    if (!res.ok) {
      console.error(res);
    }
  }

  if (!session?.user?.email) {
    router.push("/login");
    return null;
  }

  return (
    <div className="relative minibox">
      <article className="flex flex-col justify-between items-center relative h-full p-6 border-2 gap-8 border-primary rounded-md">
        <a href={`/boxes/${box.id}`}>{box.boxName}</a>
      </article>

      {box.users.some((user) => user.email === session.user?.email) ? (
        <article className=" absolute top-[-10px] right-[-10px] aspect-square rounded-full bg-primary w-[35px] flex items-center justify-center">
          <FontAwesomeIcon className="text-white" icon={faCheck} />
        </article>
      ) : (
        <button
          onClick={handleConnect}
          className=" absolute top-[-10px] right-[-10px] aspect-square rounded-full bg-primary w-[35px] flex items-center justify-center"
        >
          <FontAwesomeIcon className="text-white" icon={faPlus} />
        </button>
      )}
    </div>
  );
}
