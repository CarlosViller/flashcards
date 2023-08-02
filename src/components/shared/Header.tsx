import { signOut } from "next-auth/react";
import Link from "next/link";
import ProfilePic from "./ProfilePic";
import {
  faMagnifyingGlass,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchBar from "./SearchBar";

export default function Header() {

  return (
    <header className="relative top-0 h-10 bg-primary flex items-center justify-between px-5 shadow-sm">
      <div className="flex items-center gap-8">
        <Link href="/" className="text-white font-semibold text-xl">
          Kartu
        </Link>
        <SearchBar />
      </div>
      <div className="flex align-middle gap-3">
        <Link href="/create" className="text-white px-2 mr-2 rounded-md border-white border-2">Create</Link>
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
