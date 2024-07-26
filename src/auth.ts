import NextAuth from "next-auth";
import kakao from "next-auth/providers/kakao";

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
    maxAge: 48 * 24 * 60 * 60,
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
        const fetched = await fetch(`${process.env.NEXTAUTH_URL}/api/user?userEmail=${token.email}`, {
          method: "GET",
          cache: "no-cache",
        });
        const userData = await fetched.json();
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
