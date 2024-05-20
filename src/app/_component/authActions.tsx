"use server";

import { signIn, signOut, auth } from "../../auth";

export const signInWithNaver = async () => {
  await signIn("naver", { redirect: true, redirectTo: "/" });
};

export const signinWithGoogle = async () => {
  await signIn("google", { redirect: true, redirectTo: "/" });
};
export const signOutWithForm = async () => {
  await signOut();
};

export { auth as getSession };
