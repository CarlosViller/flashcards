import Header from "@/components/shared/Header";
import Loading from "@/components/shared/Loading";
import { CardBoxWithCards } from "@/types";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function BoxPage({ cardBox }) {
  const [box, setBox] = useState<CardBoxWithCards | null>(null);

  return <div>{cardBox.boxName}</div>;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.query;

  const res = await fetch(`api/cardBox/${id}`);

  if (!res.ok) {
    return { props: { cardBox: [{ boxName: "error" }] } };
  }
  const cardBox = await res.json();

  return { props: { cardBox } };
}
