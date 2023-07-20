import { signIn } from "next-auth/react";
import Image from "next/image";

export default function Auth() {
  const handleGoogleAuth = () => {
    signIn("google", { callbackUrl: "/" });
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-medium mb-3">Access with</h2>
      <button onClick={handleGoogleAuth} className="flex items-center gap-1">
        <Image
          src="/assets/g-logo.png"
          alt="Google logo"
          width={20}
          height={20}
        />
        <span>Google</span>
      </button>
      <hr />
    </div>
  );
}
