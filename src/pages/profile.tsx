import Header from "@/components/shared/Header";
import ProfilePic from "@/components/shared/ProfilePic";
import { useSession } from "next-auth/react";

export default function Profile() {
  const { data: session } = useSession();

  if (session)
    return (
      <div>
        <Header />
        <div className="flex flex-col items-center pt-10 text-center gap-4 container mx-auto">
          <ProfilePic size={100} defaultIconSize="text-9xl" />
          <div>
            <h1 className="text-4xl">{session.user?.name}</h1>
            <small>{session.user?.email}</small>
          </div>
          <div className="flex justify-between gap-10">
            <div className="flex flex-col">
              <h2 className="text-xl font-medium">Boxes</h2>
              <h2>2</h2>
            </div>
            <div className="flex flex-col">
              <h2 className="text-xl font-medium">Cards</h2>
              <h2>15</h2>
            </div>
          </div>
        </div>
      </div>
    );

  return null;
}
