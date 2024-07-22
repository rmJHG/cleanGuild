"use client";

import { postAction } from "../_lib/postAction";
import classes from "./postForm.module.css";
import { ChangeEvent, useState } from "react";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Cooltime from "./Cooltime";

type Props = {
  guildData: GuildData;
};
export default function PostForm({ guildData }: Props) {
  const { data: session } = useSession();
  const { handsData } = session!.user;
  if (!handsData) return null;
  const [titleLength, setTitleLength] = useState(0);
  const [desLength, setDesLength] = useState(0);
  const guildTypeOption = ["친목", "솔로", "랭킹", "자유", "부캐"];
  const { guild_name, guild_level, guild_member_count, currentNoblePoint, postCooltime } = guildData;

  const userData = { handsData, userEmail: session?.user?.email };
  const changeTitleLengthHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitleLength(e.target.value.length);
  };
  const changeDescriptionLengthHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDesLength(e.target.value.length);
  };

  return (
    <div className={classes.container}>
      <form
        action={async (formData: FormData) => {
          formData.append("currentNoblePoint", JSON.stringify(currentNoblePoint));
          await postAction(formData);
          redirect("/");
        }}
      >
        <div className={classes.titleContainer}>
          <div>
            <label htmlFor="title">제목</label>
            <p>{titleLength} / 20</p>
          </div>
          <input type="text" name="title" id="title" maxLength={20} onChange={changeTitleLengthHandler} required />
        </div>

        <div className={classes.desContainer}>
          <div>
            <label htmlFor="description">설명</label>
            <p>{desLength} / 100</p>
          </div>
          <textarea
            name="description"
            id="description"
            maxLength={100}
            onChange={changeDescriptionLengthHandler}
            required
          />
        </div>

        <div className={classes.guildInfoContainer}>
          <div>
            <p>길드정보</p>
          </div>
          <div>
            <p id="guildName">
              {guild_name} Lv{guild_level}
            </p>
          </div>
          <div className={classes.selectContainer}>
            <label htmlFor="guildType">길드 종류</label>
            <select name="guildType" id="guildType">
              {guildTypeOption.map((e, i) => {
                return (
                  <option key={i} value={e}>
                    {e}
                  </option>
                );
              })}
            </select>
          </div>

          <div className={classes.noblePointContainer}>
            <label htmlFor="currentNoblePoint">노블포인트 </label>
            <p id="currentNoblePoint">: {guildData.currentNoblePoint}</p>
          </div>
        </div>

        <div className={classes.userConditionsContainer}>
          <div>
            <p>유저 조건</p>
          </div>
          <div>
            <label htmlFor="limitedLevel">레벨 제한</label>
            <input type="number" name="limitedLevel" id="limitedLevel" max={300} />
          </div>

          <div>
            <label htmlFor="suroPoint">수로 점수</label>
            <input type="number" name="suroPoint" id="suroPoint" max={999999} />
          </div>
          <div>
            <p> * 제한이 없을 경우 빈칸으로 기재</p>
          </div>
        </div>

        <div className={classes.btnContainer}>
          <Cooltime postCooltime={postCooltime} />
        </div>
      </form>
    </div>
  );
}
