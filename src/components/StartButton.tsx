import Link from "next/link";

type Props = {
  id: string | number;
};

export default function StartButton({ id }: Props) {
  return (
    <Link href={`/study?boxId=${id}`} className="start-study-btn btn-primary">
      Start
    </Link>
  );
}
