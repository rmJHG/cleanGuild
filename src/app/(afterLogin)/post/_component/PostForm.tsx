"use client";

import { postAction } from "../_lib/postAction";

import { useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Cooltime from "./Cooltime";
import Select from "../../../_components/Select";
import { errorModal } from "@/app/_lib/errorModal";
import classes from "../styles/postForm.module.css";
type Props = {
  guildData: GuildData;
};
export default function PostForm({ guildData }: Props) {
  const { data: session } = useSession();
  if (!session) return null;
  const { handsData } = session.user;
  if (!handsData) return null;
  const route = useRouter();
  const [guildType, setGuildType] = useState("");
  const [childGuild, setChildGuild] = useState("");
  const [title, setTitle] = useState("");
  const [des, setDes] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const guildTypeOption = ["친목", "솔로", "랭킹", "자유", "유니온"];
  const { guild_name, guild_level, guild_member_count, currentNoblePoint, postCooltime } = guildData;

  return (
    <div className={classes.container}>
      <form
        action={async (formData: FormData) => {
          const inputLevel = formData.get("limitedLevel");
          const level = Number(inputLevel);
          if (!guildType) return errorModal("길드타입을 작성해주세요.");
          if (!des) return errorModal("소개를 입력해주세요.");
          if (!title) return errorModal("제목을 입력해주세요.");
          if (!childGuild) return errorModal("부캐 길드 유무를 골라주세요.");
          if (!inputLevel) return errorModal("레벨을 입력해주세요.");
          if (level > 300) return errorModal("레벨은 300 이하여야 합니다.");

          formData.append("currentNoblePoint", JSON.stringify(currentNoblePoint));
          formData.append("description", JSON.stringify(textAreaRef.current!.value.replaceAll("\n", "<br/>")));
          formData.append("childGuild", JSON.stringify(childGuild));

          await postAction(formData);
          window.location.reload;
          route.push("/");
        }}
      >
        <section className={classes.guildInfo}>
          <div>
            <h2>길드 정보</h2>
          </div>
          <ul className={classes.guildInfoContainer}>
            <li>
              <p>길드 이름</p>
              <p id="guildName">{guild_name}</p>
            </li>
            <li>
              <p>길드 레벨</p>
              <p>{guild_level}</p>
            </li>
            <li>
              <p>길드 인원</p>
              <p>{guild_member_count}</p>
            </li>

            <li>
              <p>현재 노블</p>
              <p id="currentNoblePoint">{guildData.currentNoblePoint}</p>
            </li>
            <li>
              <p>길드 종류</p>
              <Select
                optionsArr={guildTypeOption}
                selectName="guildType"
                placeholder="길드 종류"
                setState={setGuildType}
              />
            </li>
            <li>
              <p>부캐 길드</p>
              <Select
                optionsArr={["유", "무"]}
                selectName="childGuild"
                placeholder="유 or 무"
                setState={setChildGuild}
              />
            </li>
          </ul>
        </section>
        <section>
          <div>
            <h2>가입자 조건</h2> <p style={{ opacity: "0.5", fontSize: "13px" }}> ( 제한이 없으면 빈칸으로 기재 )</p>
          </div>
          <ul className={classes.userConditionsContainer}>
            <li>
              <label htmlFor="limitedLevel">레벨 제한</label>
              <input type="number" name="limitedLevel" id="limitedLevel" placeholder="1~300" />
            </li>

            <li>
              <label htmlFor="suroPoint">수로 점수</label>
              <input type="number" name="suroPoint" id="suroPoint" placeholder="10만점 이하" />
            </li>
          </ul>
        </section>
        <section className={classes.contactContainer}>
          <div>
            <h2>연락 방법</h2>
          </div>
          <div className={classes.contact}>
            <p>인게임 문의</p>
            <input
              type="text"
              name="managerName"
              id="managerName"
              placeholder="관리자 닉네임을 해시태그형식으로 작성해주세요! ex)#백무혁#방구"
            />
          </div>
          <div className={classes.contact}>
            <p>오픈채팅 링크</p>
            <input type="text" name="openKakaotalkLink" id="openKakaotalkLink" placeholder="길드 문의방 링크" />
          </div>
        </section>
        <section className={classes.descriptionContainer}>
          <div>
            <h2>길드 소개</h2>
          </div>

          <input
            type="text"
            name="title"
            id="title"
            maxLength={20}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            placeholder="제목을 입력해주세요!"
          />

          <textarea
            ref={textAreaRef}
            maxLength={500}
            onChange={(e) => {
              setDes(e.target.value);
            }}
            placeholder="길드를 소개해주세요!"
          />
        </section>

        <div className={classes.btnContainer}>
          {!postCooltime ? <button>홍보하기</button> : <Cooltime postCooltime={postCooltime} />}
        </div>
      </form>
    </div>
  );
}
