import prisma from "@/backend/prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import { Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GoogleProvider({
      clientId:
        "545521057305-j3lhg9ng741b95vnd1tekme80akegcdj.apps.googleusercontent.com",
      clientSecret: "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",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    // ...add more providers here
  ],
});
