import NextAuth from "next-auth";
import google from "next-auth/providers/google";
import kakao from "next-auth/providers/kakao";
import naver from "next-auth/providers/naver";

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  providers: [
    kakao({
      clientId: process.env.AUTH_KAKAO_ID,
      clientSecret: process.env.AUTH_KAKAO_SECRET,
    }),
    naver({
      clientId: process.env.AUTH_NAVER_ID,
      clientSecret: process.env.AUTH_NAVER_SECRET,
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
