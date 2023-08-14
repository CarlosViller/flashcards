import prisma from "@/backend/prisma/client";
import Header from "@/components/shared/Header";
import ProfilePic from "@/components/shared/ProfilePic";
import { SessionUser } from "@/types";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";

interface Props extends SessionUser {
  connectedBoxCount: number
}

export default function Profile({ user, connectedBoxCount: connectedBoxCount }: Props) {

  return (
    <div>
      <Header />
      <div className="flex flex-col items-center pt-10 text-center gap-4 container mx-auto">
        <ProfilePic size={100} />
        <div>
          <h1 className="text-4xl">{user.name}</h1>
          <small>{user.email}</small>
        </div>
        <div className="flex justify-between gap-10">
          <div className="flex flex-col">
            <h2 className="text-xl font-medium">Boxes</h2>
            <h2>{connectedBoxCount}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);

  if (!session?.user?.email) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const cardBoxes = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    select: {
      boxes: true,
    },
  });

  return {
    props: {user: session.user, connectedBoxCount: cardBoxes?.boxes.length },
  };
}
