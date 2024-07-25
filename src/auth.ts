import NextAuth from "next-auth";
import kakao from "next-auth/providers/kakao";
import { getUserDataDetail } from "./getUserData";

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
  ],
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
    maxAge: 14 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  callbacks: {
    signIn: async ({ account, profile, user }) => {
      if (!account || !profile || !user) {
        return "/auth/error";
      }
      return true;
    },
    jwt: async ({ token, user, session, account }) => {
      if (account) {
        const userData = await getUserDataDetail(token.email as string);
        token.user = {
          ...userData,
        };
      }
      return token;
    },
    session: async ({ session, token, user }) => {
      if (token.user) {
        session.user.handsData = token.user.handsData;
        session.user.dbId = token.user.id;
        session.user.ocid = token.user.ocid;
      }

      return session;
    },
  },
  trustHost: true,
});
