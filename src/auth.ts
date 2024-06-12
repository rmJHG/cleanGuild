import NextAuth, { Account, Profile } from "next-auth";
import google from "next-auth/providers/google";
import naver from "next-auth/providers/naver";

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  providers: [
    naver({
      clientId: process.env.AUTH_NAVER_ID,
      clientSecret: process.env.AUTH_SECRET,
    }),
    google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    signIn: async ({ account, profile }) => {
      if (account?.provider === "google") {
        console.log(profile?.email_verified);
      }
      if (account?.provider === "naver") {
      }
      return true;
    },
    jwt: async ({ token, user }) => {
      return token;
    },
    session: async ({ session, token }) => {
      return session;
    },
  },
});
