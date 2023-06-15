import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="relative top-0 h-10 bg-green_primary flex items-center justify-between px-5 shadow-sm">
      <h2 className="text-white font-semibold text-xl">Kartu</h2>
      <div className="flex align-middle gap-3">
        <Link href="/profile" className="flex items-center">
          {session?.user?.image ? (
            <Image
              className=" rounded-full"
              src={session?.user?.image}
              width={40}
              height={40}
              alt="profile photo"
            />
          ) : (
            <span className="material-symbols-outlined text-white text-2xl">
              Default icon
            </span>
          )}
        </Link>
        <button
          onClick={() => signOut()}
          className="material-symbols-outlined text-white text-2xl"
        >
          logout
        </button>
      </div>
    </header>
  );
}
