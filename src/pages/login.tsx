import Auth from "@/components/Auth";
import { useMediaQuery } from "@/utils";
import React from "react";

export default function AuthPage() {
  const isMobile = useMediaQuery(500);

  const Login = isMobile ? MobileLogin : DesktopLogin;

  return <Login />;
}

function DesktopLogin() {
  return (
    <div className="bg-primary h-screen w-screen flex justify-between">
      <div className="text-white mx-10 pt-[120px]">
        <h1 className="text-9xl font-semibold">Kartu</h1>
        <p>An application to create and share flashcards.</p>
      </div>
      <div className="h-scree w-1/3 bg-white shadow-xl pt-[150px]">
        <Auth />
      </div>
    </div>
  );
}

function MobileLogin() {
  return (
    <section>
      <h1 className="text-3xl font-semibold shadow-xl text-white bg-primary py-2 text-center">
        Kartu
      </h1>
      <div className="mt-8">
        <Auth />
      </div>
    </section>
  );
}
