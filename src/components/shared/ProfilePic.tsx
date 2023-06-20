import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

type Props = {
  size?: number;
  defaultIconSize?: string;
};

export default function ProfilePic({
  size = 40,
  defaultIconSize = "text-2xl",
}: Props) {
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

  return (
    <span className={`material-symbols-outlined  ${defaultIconSize}`}>
      person
    </span>
  );
}
