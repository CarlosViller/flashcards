import { signOut } from "next-auth/react";
import Link from "next/link";
import ProfilePic from "./ProfilePic";

export default function Header() {
  return (
    <header className="relative top-0 h-10 bg-green_primary flex items-center justify-between px-5 shadow-sm">
      <Link href="/" className="text-white font-semibold text-xl">
        Kartu
      </Link>
      <div className="flex align-middle gap-3">
        <Link href="/profile" className="flex items-center">
          <ProfilePic />
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
