import prisma from "@/backend/prisma/client";
import Profile from "@/components/Profile";
import { SessionUser } from "@/types";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";

interface Props extends SessionUser {
  id: string;
}

export default function CurrentUserProfilePage({ user, id }: Props) {
  return <Profile user={user} id={id} />;
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

  const dbUser = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    select: {
      id: true,
    },
  });

  if (!dbUser) {
    return {
      props: { user: null, id: null },
    };
  }

  return {
    props: { user: session.user, id: dbUser.id },
  };
}
