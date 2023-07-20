import { signOut } from "next-auth/react";
import Link from "next/link";
import ProfilePic from "./ProfilePic";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Header() {
  return (
    <header className="relative top-0 h-10 bg-primary flex items-center justify-between px-5 shadow-sm">
      <Link href="/" className="text-white font-semibold text-xl">
        Kartu
      </Link>
      <div className="flex align-middle gap-3">
        <Link href="/profile" className="flex items-center">
          <ProfilePic />
        </Link>
        <button onClick={() => signOut()} className=" text-white">
          <FontAwesomeIcon icon={faRightFromBracket} size="1x" />
        </button>
      </div>
    </header>
  );
}
