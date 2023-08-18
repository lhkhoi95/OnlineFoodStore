import axios, { AxiosResponse } from "axios";
import { AuthOptions as NextAuthOptions, User } from "next-auth/core/types";
import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    Credentials({
      name: 'Sign In',
      credentials: {
        email: { label: "Email" },
        password: { label: "Password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const { email, password } = credentials;

        try {
          const response: AxiosResponse = await axios.post(`${API_URL}/auth/login`, { email, password });

          const user = response.data as User;

          if (user) return user;
          return null;
        } catch (err: any) {
          console.log("ERROR", err.response.data);

          throw new Error(err.response.status);
        }
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token as any;
      return session;
    }
  },
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST, authOptions };
