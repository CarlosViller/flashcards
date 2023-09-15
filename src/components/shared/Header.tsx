import { useSession } from "next-auth/react";
import Link from "next/link";
import ProfilePic from "./ProfilePic";
import SearchBar from "./SearchBar";
import { useRouter } from "next/router";
import { useMediaQuery } from "@/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  const { data: session } = useSession();
  const router = useRouter();

  const isMobile = useMediaQuery(500);

  if (router.pathname === "/login") return null;

  return (
    <header className="relative top-0 h-10 bg-primary flex items-center justify-between lg:px-5 px-2 shadow-sm">
      <div className="flex items-center gap-8">
        <Link href="/" className="text-white font-semibold text-xl">
          Kartu
        </Link>
        {!isMobile && <SearchBar />}
      </div>
      <section className="flex items-center gap-4">
        <button onClick={() => console.log("press")}>
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="text-white"
            size="lg"
          />
        </button>
        <Link href="/profile/me" className="flex items-center">
          <ProfilePic
            image={session?.user?.image}
            defaultIcon="/assets/default-user-logo-white.svg"
            size={55}
          />
        </Link>
      </section>
    </header>
  );
}
