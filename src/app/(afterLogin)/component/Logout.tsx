"use client";

import { useUserData } from "@/zustand/userDataState";
import { signOut } from "next-auth/react";
import { FormEvent } from "react";

export default function Logout() {
  const { deleteUserData } = useUserData();
  const Logout = async (e: FormEvent) => {
    e.preventDefault();
    await deleteUserData();
    await signOut();
  };
  return (
    <form>
      <button onClick={Logout}>LOGOUT</button>
    </form>
  );
}
