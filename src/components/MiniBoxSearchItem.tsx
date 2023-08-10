import { CardBoxWithCardsAndUsers } from "@/types";
import { faCheck, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import MiniBoxAction from "./shared/MiniBoxAction";

type Props = {
  box: CardBoxWithCardsAndUsers;
  handleConnect: (boxId: number) => Promise<void>;
};

export default function MiniBoxSearchItem({ box, handleConnect }: Props) {
  const { data: session } = useSession();
  const router = useRouter();
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
        <article className="bg-primary minibox-action">
          <FontAwesomeIcon className="text-white" icon={faCheck} size="2xs" />
        </article>
      ) : (
        <MiniBoxAction onClick={() => handleConnect(box.id)} color="primary">
          <FontAwesomeIcon className="text-white" icon={faPlus} size="2xs" />
        </MiniBoxAction>
      )}
    </div>
  );
}
