"use client";

import { useUserData } from "@/zustand/userDataState";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export default function Logout() {
  const router = useRouter();
  const { deleteUserData } = useUserData();
  const Logout = async (e: FormEvent) => {
    e.preventDefault();
    deleteUserData();
    await signOut();
    router.push("/");
  };
  return (
    <form>
      <button onClick={Logout}>
        <p>로그아웃</p>
      </button>
    </form>
  );
}
