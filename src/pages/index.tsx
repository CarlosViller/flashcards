import { useSession } from "next-auth/react";

import Home from "@/components/Home";
import Login from "@/components/Login";
import LoadingSpinner from "@/components/Spinner";

export default function Root() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <LoadingSpinner />;
  }

  if (session) {
    return <Home />;
  }

  return <Login />;
}
