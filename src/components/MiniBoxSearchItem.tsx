import { CardBoxWithCardsAndUsers } from "@/types";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MiniBoxAction from "./shared/MiniBoxAction";
import Link from "next/link";

type Props = {
  box: CardBoxWithCardsAndUsers;
  handleConnect: (boxId: number) => Promise<void>;
};

export default function MiniBoxSearchItem({ box, handleConnect }: Props) {
  return (
    <div className="relative minibox">
      <article className="flex flex-col justify-between items-center relative h-full p-6 border-2 gap-8 border-primary rounded-md">
        <Link href={`/boxes/${box.id}`}>{box.boxName}</Link>
      </article>

      <MiniBoxAction onClick={() => handleConnect(box.id)} variant="add">
        <FontAwesomeIcon className="text-white" icon={faPlus} size="2xs" />
      </MiniBoxAction>
    </div>
  );
}
