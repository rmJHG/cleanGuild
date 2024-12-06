"use client";

import { GuildPostData } from "@/types/guildPostData";
import classes from "./styles/post.module.css";
import UserImg from "./UserImg";
import Link from "next/link";
import { successModal } from "@/app/_lib/successModal";
import { errorModal } from "@/app/_lib/errorModal";
import { serverList } from "@/app/serverList";
import Image from "next/image";

export default function Post({ data }: { data: GuildPostData }) {
  console.log(data);
  const { publisherData, postData, _id } = data;
  const { email, handsData } = publisherData;
  const [[world_icon, _1]] = serverList.filter((e) => {
    return e[1] === publisherData.handsData.world_name;
  });
  console.log(world_icon);
  const {
    title,
    description,
    limitedLevel,
    guildName,
    guildType,
    currentNoblePoint,
    suroPoint,
    postDate,
    openKakaotalkLink,
    managerNameArr,
    childGuild,
    guildLevel,
    guildMemberCount,
  } = postData;

  const getDate = () => {
    const postedDate = new Date(postDate);
    const isoString = postedDate.toISOString();
    return isoString.split("T")[0]; //
  };

  const textCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      successModal("닉네임이 복사됐습니다.", 1000);
    } catch (error) {
      errorModal("복사에 실패했습니다.");
    }
  };

  return (
    <div className={classes.container}>
      <header className={classes.postHeaderContainer}>
        <div className={classes.titleWrapeer}>
          <h1>{title}</h1>
        </div>

        <div className={classes.publisherInfo}>
          <UserImg imgLink={handsData.character_image} />
          <span className={classes.publisherName}>{handsData.character_name}</span>
          <div className={classes.separate}></div>
          <p>{getDate()}</p>
        </div>
      </header>

      <section className={classes.guildConditionsContainer}>
        <div className={classes.guildName}>
          <h2>
            <span className={classes.worldIcon}>
              <Image src={world_icon} alt="world_icon" width={20} height={20} />
            </span>
            <span> Lv{guildLevel}</span>
            <span>{guildName}</span>
          </h2>
          <Link href={`/guild/${handsData.world_name}/${guildName}`} target="_blank" className={classes.guildInfoLink}>
            <span> 정보보기 </span>
          </Link>
        </div>
        <ul className={classes.guildConditionsListBox}>
          <li className={classes.guildConditionsInfo}>
            <span>길드 타입</span>
            <span>{guildType}</span>
          </li>
          <li className={classes.guildConditionsInfo}>
            <span>길드원 수</span>
            <span>{guildMemberCount}</span>
          </li>
          <li className={classes.guildConditionsInfo}>
            <span>부캐 길드</span>
            <span>{childGuild ? "있음" : "없음"}</span>
          </li>{" "}
          <li className={classes.guildConditionsInfo}>
            <span>길드 노블</span>
            <span>{currentNoblePoint}p</span>
          </li>
          <li className={classes.guildConditionsInfo}>
            <span>레벨 제한</span>
            <span>{limitedLevel || "제한없음"}</span>
          </li>
          <li className={classes.guildConditionsInfo}>
            <span>수로 점수</span>
            <span>{suroPoint || "제한없음"}</span>
          </li>
          <li className={classes.guildConditionsInfo}>
            <span>오픈 카톡</span>
            {openKakaotalkLink ? (
              <Link href={openKakaotalkLink} target="_blank">
                <span>오픈톡</span>
              </Link>
            ) : (
              <span>없음</span>
            )}
          </li>
          {managerNameArr && (
            <li className={classes.guildConditionsInfo}>
              <span>인게임 문의</span>
              <div className={classes.managerNameContainer}>
                {managerNameArr.map((e) => {
                  return (
                    <p
                      key={e}
                      onClick={() => {
                        textCopy(e);
                      }}
                    >
                      {e}
                    </p>
                  );
                })}
              </div>
            </li>
          )}
        </ul>
      </section>
      <section className={classes.desWrapper}>
        <div>
          <pre style={{ whiteSpace: "pre-wrap" }}>{description.replaceAll("<br/>", "\n")}</pre>
        </div>
      </section>
    </div>
  );
}
