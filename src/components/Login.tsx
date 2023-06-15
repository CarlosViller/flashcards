import { signIn } from "next-auth/react";
import Image from "next/image";
import GoogleLogo from "@assets/g-logo.png";

export default function Login() {
  return (
    <div className="bg-green_primary h-screen w-screen flex justify-between">
      <div className="text-white mx-10 pt-[120px]">
        <h1 className="text-9xl font-semibold">Kartu</h1>
        <p>An application to create flashcards.</p>
      </div>
      <div className="h-scree w-1/3 bg-white shadow-xl pt-[150px]">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-medium mb-3">Access with</h2>
          <button
            onClick={() => signIn("google")}
            className="flex items-center gap-1"
          >
            <Image src={GoogleLogo} width={20} alt="google sign in logo" />
            <span>Google</span>
          </button>
        </div>
      </div>
    </div>
  );
}
