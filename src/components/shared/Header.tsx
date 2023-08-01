import { signOut } from "next-auth/react";
import Link from "next/link";
import ProfilePic from "./ProfilePic";
import {
  faMagnifyingGlass,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Header() {
  function handleSearch() {
    console.log("search");
  }
  return (
    <header className="relative top-0 h-10 bg-primary flex items-center justify-between px-5 shadow-sm">
      <div className="flex items-center gap-8">
        <Link href="/" className="text-white font-semibold text-xl">
          Kartu
        </Link>
        <section className="bg-white rounded-lg px-4 flex items-center w-max">
          <input
            type="text"
            placeholder="Search boxes"
            className="text-xs py-[4px] w-[350px]"
          />
          <button type="button" onClick={handleSearch}>
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="text-primary"
            />
          </button>
        </section>
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
