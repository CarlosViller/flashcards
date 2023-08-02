import Header from "@/components/shared/Header";
import ProfilePic from "@/components/shared/ProfilePic";
import { SessionProps } from "@/types";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";

export default function Profile({ session }: SessionProps) {
  return (
    <div>
      <Header />
      <div className="flex flex-col items-center pt-10 text-center gap-4 container mx-auto">
        <ProfilePic size={100} />
        <div>
          <h1 className="text-4xl">{session.user?.name}</h1>
          <small>{session.user?.email}</small>
        </div>
        <div className="flex justify-between gap-10">
          <div className="flex flex-col">
            <h2 className="text-xl font-medium">Boxes</h2>
            <h2>2</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
