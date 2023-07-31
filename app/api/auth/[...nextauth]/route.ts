import NextAuth, { type NextAuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { Adapter } from "next-auth/adapters";

export const authOptions: NextAuthOptions = {
  providers: [
    // Session cannot be persisted in db with credentials provider
    // https://next-auth.js.org/configuration/providers/credentials
    // CredentialsProvider({
    //   credentials: {
    //     email: { label: "Email", type: "email" },
    //     password: { label: "Password", type: "password" },
    //   },
    //   async authorize(credentials) {
    //     const { email, password } = credentials ?? {};
    //     if (!email || !password) {
    //       throw new Error("Missing username or password");
    //     }

    //     const user = await prisma.user.findUnique({
    //       where: {
    //         email,
    //       },
    //     });

    //     // if user doesn't exist or password doesn't match
    //     if (!user || !(await compare(password, user.password))) {
    //       throw new Error("Invalid username or password");
    //     }
    //     return user;
    //   },
    // }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  adapter: PrismaAdapter(prisma) as Adapter,
  //nextauth will enforce a 'database' session strategy by default
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
