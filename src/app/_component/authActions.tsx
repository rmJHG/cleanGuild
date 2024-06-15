"use server";

import { signIn, signOut, auth } from "../../auth";

export const signInWithKaKao = async () => {
  await signIn("kakao", { redirect: true, redirectTo: "/setting" });
};
export const signInWithNaver = async () => {
  await signIn("naver", { redirect: true, redirectTo: "/setting" });
};
export const signInWithGoogle = async () => {
  await signIn("google", { redirect: true, redirectTo: "/setting" });
};
export const signOutWithForm = async () => {
  await signOut();
};

export { auth as getSession };
