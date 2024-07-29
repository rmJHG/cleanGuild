"use server";

import { signIn, signOut, auth } from "../../auth";

export const signInWithKaKao = async () => {
  await signIn("kakao", { redirect: true, redirectTo: "/" });
};
export const signOutWithForm = async () => {
  await signOut();
};

export { auth as getSession };
