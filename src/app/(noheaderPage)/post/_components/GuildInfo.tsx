import Select from '@/app/_components/Select';
import classes from './_styles/guildInfo.module.css';
import { useState } from 'react';
import { postStore } from '@/store/postStore';
import { error } from 'console';
import { errorModal } from '@/app/_lib/errorModal';
import Link from 'next/link';

function GuildInfo({ guildData, onNext }: { guildData: GuildData; onNext: () => void }) {
  console.log(guildData);

  const {
    currentNoblePoint,
    guild_level,
    guild_master_name,
    guild_member_count,
    guild_name,
    world_name,
  } = guildData;

  const { guildType, setPostState, resetPostState } = postStore();
  const guildTypeOption = ['친목', '솔로', '랭킹', '자유', '유니온'];

  const handleNext = () => {
    if (!guildType) return errorModal('길드타입을 선택해주세요.');
    onNext();
  };
  const handleSelectChange = (value: string) => {
    setPostState({ guildType: value });
  };
  return (
    <div className={classes.container}>
      <header className={classes.header}>
        <h2>길드 홍보 ( 1 / 4 )</h2>
        <p>홍보하려는 길드 정보를 확인해주세요.</p>
      </header>
      <div className={classes.infoContainer}>
        <p>
          <span>{world_name}</span> 월드의 <span>{guild_name}</span>길드이고
        </p>
        <p>
          길드가 추구하는<span>방향</span>은
        </p>
        <div className={classes.guildConditionsInfo}>
          <Select
            optionsArr={guildTypeOption}
            selectName="guildType"
            setState={handleSelectChange}
            placeholder="길드타입"
            currentState={guildType}
          />
          <p>입니다.</p>
        </div>
        <p>
          길드원은 총 <span>{guild_member_count}</span>명이고
        </p>
        <p>
          현재 노블 포인트는 <span>{currentNoblePoint}</span>p 입니다.
        </p>
      </div>
      <div className={classes.btnContainer}>
        <Link href="/" onClick={() => resetPostState()}>
          <p>메인으로</p>
        </Link>
        <button onClick={() => handleNext()}>
          <p>다음으로</p>
        </button>
      </div>
    </div>
  );
}

export default GuildInfo;
