import { GuildPostData } from "@/type/guildPostData";
import classes from "./guild.module.css";

export default function Guild({ data }: { data: GuildPostData }) {
  const { postData, publisherData } = data;
  const {
    title,
    currentNoblePoint,
    description,
    goalNoblePoint,
    guildName,
    guildType,
    postDate,
    limitedLevel,
    suroPoint,
  } = postData;
  const { info } = publisherData;

  function getTimeDifference() {
    const dateDiffInMinutes = (Date.now() - new Date(postDate).getTime()) / 1000 / 60;
    if (Math.floor(dateDiffInMinutes / 1440)) return `${Math.floor(dateDiffInMinutes / 1440)}일 전`;
    if (60 <= dateDiffInMinutes && dateDiffInMinutes < 1440) return `${Math.floor(dateDiffInMinutes)}시간 전`;
    if (dateDiffInMinutes < 60) return `${Math.floor(dateDiffInMinutes)}분 전`;
    return "방금 전";
  }

  return (
    <div className={classes.postContainer}>
      <header className={classes.postHeader}>
        <div>
          <p>{guildName}</p>
        </div>
      </header>

      <div className={classes.guildConditions}>
        <div className={classes.nobleWrapper}>
          <p>{currentNoblePoint}P</p>
        </div>
        <div className={classes.guildType}>
          <p> {guildType}</p>
        </div>
        {suroPoint !== 0 && (
          <div className={classes.suroPoint}>
            <p>수로 {suroPoint}점</p>
          </div>
        )}
        {limitedLevel !== 0 && (
          <div className={classes.limitedLevel}>
            <p>LV{limitedLevel}↑↑</p>
          </div>
        )}
      </div>

      <div className={classes.postMain}>
        <div className={classes.title}>
          <p>{title}</p>
        </div>
      </div>

      <footer className={classes.postFooter}>
        <div className={classes.pusblisherName}>
          <p>{info.handsData.character_name}</p>
        </div>

        <div className={classes.postDate}>
          <p>{getTimeDifference()}</p>
        </div>
      </footer>
    </div>
  );
}
