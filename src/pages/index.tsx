import { useSession } from "next-auth/react";
import Login from "@/components/Login";
import LoadingSpinner from "@/components/shared/Spinner";
import Home from "@/components/Home";

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
