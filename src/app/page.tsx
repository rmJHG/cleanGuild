"use client";

import { useUserData } from "@/zustand/userDataState";
import SearchBar from "./_component/SearchBar";

export default function Page() {
  const { data } = useUserData();

  return (
    <div>
      <button
        onClick={() => {
          console.log(data);
        }}
      >
        alaal
      </button>
      <SearchBar />
    </div>
  );
}
