"use client";
import { useRouter } from "next/navigation";
import { FormEventHandler } from "react";
import classes from "../_styles/components/searchGuild.module.css";
import { errorModal } from "../_lib/errorModal";
export default function SearchGuildBar() {
  const route = useRouter();

  const searchGuild: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!e.currentTarget.guildName.value) return errorModal("길드명을 입력해주세요!");
    route.push(`/search/${e.currentTarget.guildName.value}`);
  };

  return (
    <div className={classes.container}>
      <form onSubmit={searchGuild}>
        <input type="text" name="guildName" placeholder="길드 검색하기" />
        <button type="submit">
          <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e8eaed">
            <path d="M765-144 526-383q-30 22-65.79 34.5-35.79 12.5-76.18 12.5Q284-336 214-406t-70-170q0-100 70-170t170-70q100 0 170 70t70 170.03q0 40.39-12.5 76.18Q599-464 577-434l239 239-51 51ZM384-408q70 0 119-49t49-119q0-70-49-119t-119-49q-70 0-119 49t-49 119q0 70 49 119t119 49Z" />
          </svg>
        </button>
      </form>
    </div>
  );
}
