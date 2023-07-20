import Auth from "@/components/Auth";
import React from "react";

export default function AuthPage() {
  return (
    <div className="bg-primary h-screen w-screen flex justify-between">
      <div className="text-white mx-10 pt-[120px]">
        <h1 className="text-9xl font-semibold">Kartu</h1>
        <p>An application to create flashcards.</p>
      </div>
      <div className="h-scree w-1/3 bg-white shadow-xl pt-[150px]">
        <Auth />
      </div>
    </div>
  );
}
