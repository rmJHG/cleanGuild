"use client";

import { GuildPostData } from "@/types/guildPostData";
import classes from "./post.module.css";
import UserImg from "./UserImg";
import Link from "next/link";

export default function Post({ data }: { data: GuildPostData }) {
  const { publisherData, postData } = data;
  const { email, handsData, dbId } = publisherData;
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
  } = postData;

  const getDate = () => {
    const postedDate = new Date(postDate);
    const isoString = postedDate.toISOString();
    return isoString.split("T")[0]; //
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

      <section className={classes.guildConditionsWrapper}>
        <div className={classes.guildName}>
          <h2>{guildName}</h2>
        </div>
        <ul className={classes.guildConditionsGrid}>
          <li className={classes.guildConditionsInfo}>
            <span>길드 타입</span> <span>{guildType}</span>
          </li>

          <li className={classes.guildConditionsInfo}>
            <span>레벨 제한</span>
            <span>{limitedLevel || "제한없음"}</span>
          </li>
          <li className={classes.guildConditionsInfo}>
            <span>길드 노블</span> <span>{currentNoblePoint}p</span>
          </li>
          <li className={classes.guildConditionsInfo}>
            <span>수로 점수</span>
            <span>{suroPoint || "제한없음"}</span>
          </li>
          <li className={classes.guildConditionsInfo}>
            <span>오픈 카톡</span>

            <Link href={openKakaotalkLink}>
              <span>오픈톡</span>
            </Link>
          </li>
        </ul>
      </section>
      <section className={classes.desWrapper}>
        <div>
          <pre>{description.replaceAll("<br/>", "\n").replaceAll(`"`, "")}</pre>
        </div>
      </section>
    </div>
  );
}
