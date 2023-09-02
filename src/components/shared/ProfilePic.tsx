import Image from "next/image";
import React from "react";

type Props = {
  size?: number;
  image?: string | null;
  defaultIcon?: string;
};

export default function ProfilePic({ size = 40, image, defaultIcon }: Props) {
  return (
    <Image
      className=" rounded-full border-4 border-primary p-[2px]"
      src={image || defaultIcon || "/assets/default-user-logo.svg"}
      width={size}
      height={size}
      alt="profile photo"
    />
  );
}
