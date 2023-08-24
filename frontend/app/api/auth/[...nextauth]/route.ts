import { getUserByEmail, loginWithProvider } from "@/lib/user";
import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { AuthOptions as NextAuthOptions, User } from "next-auth/core/types";
import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

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
        loginWithProvider: { label: "Login with Provider" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const { email, password } = credentials;
        const loginWithProvider = false;

        try {
          const response: AxiosResponse = await axios.post(`${API_URL}/auth/login`, { email, password, loginWithProvider });

          const user = response.data as User;

          if (user) return user;
          return null;
        } catch (err: any) {
          console.log("ERROR", err.response.data);

          throw new Error(err.response.status);
        }
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    })
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // fetch user from db
        const userFromDb = await getUserByEmail(user.email as string);

        // If user is local user, return session
        if (userFromDb && !userFromDb.loginWithProvider) return { ...token, ...user };;

        // If user is null, or loginWithProvider is false, it's a provider user, login with provider to obtain access token
        const userWithAccessToken = await loginWithProvider(user);

        // If user is null, throw error
        if (!userWithAccessToken) throw new Error("Failed to login with provider");
        // If user is not null, return session
        return { ...token, ...userWithAccessToken };
      }
      return { ...token };
    },
    async session({ session, token, user }) {
      session.user = token as any;
      return session;
    },
  },
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST, authOptions };
