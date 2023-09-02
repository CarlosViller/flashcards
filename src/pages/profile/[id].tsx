import prisma from "@/backend/prisma/client";
import Profile from "@/components/Profile";
import { SessionUser } from "@/types";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";

interface Props extends SessionUser {
  id: string;
}

export default function UserProfilePage({ user, id }: Props) {
  return <Profile user={user} id={id} />;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);
  const { id } = context.query;

  if (!session?.user?.email) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  if (typeof id !== "string") {
    return {
      props: { user: null, id: null },
    };
  }

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  return {
    props: { user, id },
  };
}
