"use client";

import { signOut } from "next-auth/react";
import { FormEvent } from "react";

export default function Logout() {
  const Logout = async (e: FormEvent) => {
    e.preventDefault();
    await signOut({ callbackUrl: "/", redirect: true });
  };
  return (
    <button onClick={Logout}>
      <p>로그아웃</p>
    </button>
  );
}
