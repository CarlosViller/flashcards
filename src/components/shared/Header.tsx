import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import ProfilePic from "./ProfilePic";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchBar from "./SearchBar";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="relative top-0 h-10 bg-primary flex items-center justify-between px-5 shadow-sm">
      <div className="flex items-center gap-8">
        <Link href="/" className="text-white font-semibold text-xl">
          Kartu
        </Link>
        <SearchBar />
      </div>
      <div className="flex items-center gap-5">
        <Link
          href="/create"
          className="create-button text-white px-4 rounded-md border-white border-2"
        >
          Create
        </Link>
        <Link href="/profile/me" className="flex items-center">
          <ProfilePic
            image={session?.user?.image}
            defaultIcon="/assets/default-user-logo-white.svg"
            size={55}            
          />
        </Link>
        <button
          onClick={() => signOut()}
          className=" text-white flex items-center"
        >
          <FontAwesomeIcon
            icon={faRightFromBracket}
          />
        </button>
      </div>
    </header>
  );
}
