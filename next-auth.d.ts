import { HandsData } from "@/type/userData";
import NextAuth, { DefaultSession, DefaultUser, JWT } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    user?: {
      id?: string;
      handsData?: HandsData;
      dbId?: string;
      ocid?: string;
    };
  }
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      handsData?: HandsData;
      dbId?: string;
      ocid?: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    handsData?: HandsData;
    dbId?: string;
    ocid?: string;
  }
}
