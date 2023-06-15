import { signOut } from "next-auth/react";
import Header from "../Header";

export default function Home() {
  return (
    <div className="flex flex-col gap-2">
      <Header />
    </div>
  );
}
