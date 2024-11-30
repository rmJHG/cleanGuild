import type { NextAuthConfig } from "next-auth";
import Kakao from "next-auth/providers/kakao";

// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [Kakao],
} satisfies NextAuthConfig;
