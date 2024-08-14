import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import { prisma } from "./client";
export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [Github],
    adapter: PrismaAdapter(prisma),
});
