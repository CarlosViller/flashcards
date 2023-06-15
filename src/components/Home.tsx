import { signOut } from "next-auth/react";
import LoadingSpinner from "./Spinner";

export default function Home() {
  return (
    <div className="flex flex-col gap-2">
      {"You're in"}
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  );
}
