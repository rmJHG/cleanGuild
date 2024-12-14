'use client';

import { GuildPostData } from '@/types/guildPostData';
import classes from './styles/post.module.css';
import Link from 'next/link';
import { CiLink } from 'react-icons/ci';
import PostHeader from './PostHeader';
import ContactModal from './ContactModal';
import Condition from './Condition';
import GuildIntro from './GuildIntro';
export default function Post({ data }: { data: GuildPostData }) {
  console.log(data);

  const { publisherData, postData, _id } = data;
  const { email, handsData } = publisherData;
  const {
    title,
    description,
    limitedLevel,
    guildName,
    guildType,
    guildContents,
    currentNoblePoint,
    postDate,
    openKakaotalkLink,
    discordLink,
    managerNameArr,
    childGuild,
    guildLevel,
    guildMemberCount,
    limitedFlagPoint,
    limitedSuroPoint,
  } = postData;

  console.log(postData);

  const ingameManager = [publisherData.handsData.character_name, 'test', ...managerNameArr];
  const getDate = () => {
    const postedDate = new Date(postDate);
    const isoString = postedDate.toISOString();
    return isoString.split('T')[0]; //
  };

  return (
    <div className={classes.container}>
      <PostHeader handsData={handsData} title={title} date={getDate} />

      <div className={classes.guildInfoContainer}>
        <h2>길드 정보</h2>
        <ul className={classes.guildInfo}>
          <li>
            <span>길드 이름</span>
            <Link href={`/guild/${handsData.world_name}/${guildName}`} target="_blank">
              {guildName}
              <CiLink />
            </Link>
          </li>
          <li>
            <span>길드 레벨</span>
            <span>{guildLevel}</span>
          </li>
          <li>
            <span>길드 타입</span>
            <span>{guildType}</span>
          </li>
          <li>
            <span>길드원 수</span>
            <span>{guildMemberCount}</span>
          </li>
          <li>
            <span>부캐 길드</span>
            <span>{childGuild ? '있음' : '없음'}</span>
          </li>
          <li>
            <span>길드 노블</span>
            <span>{currentNoblePoint}p</span>
          </li>
        </ul>
      </div>
      <div className={classes.conditionContainer}>
        <h2>가입자 제한</h2>
        <div className={classes.conditionList}>
          <Condition condition="" value={limitedLevel} />
          <Condition condition="guildContents" value={guildContents} />
          <Condition condition="suroPoint" value={limitedSuroPoint} />
          <Condition condition="flagPoint" value={limitedFlagPoint} />
        </div>
      </div>

      <div className={classes.guildIntroContainer}>
        <h2>길드 소개</h2>
        <div className={classes.guildIntro}>
          <GuildIntro description={description} />
        </div>
      </div>
      <div className={classes.fixedContainer}>
        <div className={classes.btnWrapper}>
          <button>지원하기</button>
        </div>
      </div>
      <ContactModal ingameManager={ingameManager} />
    </div>
  );
}
