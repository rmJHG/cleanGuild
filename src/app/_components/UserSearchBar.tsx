"use client";
import { useRouter } from "next/navigation";
import { FormEventHandler } from "react";

export default function UserSearchBar() {
  const route = useRouter();

  const searchUser: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    route.push(`/search/${e.currentTarget.search.value}`);
  };

  return (
    <form onSubmit={searchUser}>
      <input type="search" name="search" required />
    </form>
  );
}
