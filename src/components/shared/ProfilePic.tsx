import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

type Props = {
  size?: number;
};

export default function ProfilePic({ size = 40 }: Props) {
  const { data: session } = useSession();

  if (session?.user?.image) {
    return (
      <Image
        className=" rounded-full"
        src={session.user.image}
        width={size}
        height={size}
        alt="profile photo"
      />
    );
  }
}
