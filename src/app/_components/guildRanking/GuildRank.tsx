'use client';
import { useState } from 'react';
import GuildRankTable from './GuildRankTable';
import { totalServerList } from '../../serverList';
import Image from 'next/image';
import classes from './styles/GuildRank.module.css';
export default function GuildRank() {
  const [rankingType, setRankingType] = useState('0');
  const [worldName, setWorldName] = useState('루나');
  const [isWorldListOpen, setIsWorldListOpen] = useState(true);
  const [isRankingTypeListOpen, setIsRankingTypeListOpen] = useState(true);
  const rankingTypeList = ['주간 명성치', '플래그 레이스', '지하 수로'];
  return (
    <div className={classes.container}>
      <div className={classes.serverListContainer}>
        <div className={classes.rankTableHeader}>
          <p>월드목록</p>
          <button
            onClick={() => {
              setIsWorldListOpen(!isWorldListOpen);
            }}
          >
            <p>{isWorldListOpen ? '목록 닫기' : '목록 열기'}</p>
          </button>
        </div>
        {isWorldListOpen && (
          <ul>
            {Object.entries(totalServerList).map(([world_name, img], i) => (
              <li
                key={world_name + i}
                onClick={() => {
                  setWorldName(world_name);
                }}
                style={{
                  border: world_name === worldName ? '1px solid transparent' : '1px solid gray',
                  backgroundColor:
                    worldName === world_name ? 'var(--selected-color)' : 'transparent',
                }}
              >
                <Image src={img} alt={`${world_name} main`} height={12} width={12} />
                <span
                  className={classes.worldName}
                  style={{ color: world_name === worldName ? 'white' : 'black' }}
                >
                  {world_name}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className={classes.rankingTypeContainter}>
        <div className={classes.rankTableHeader}>
          <p>랭킹 종류</p>
          <button
            onClick={() => {
              setIsRankingTypeListOpen(!isRankingTypeListOpen);
            }}
          >
            <p>{isRankingTypeListOpen ? '목록 닫기' : '목록 열기'}</p>
          </button>
        </div>
        {isRankingTypeListOpen && (
          <ul>
            {rankingTypeList.map((e, i) => {
              return (
                <li
                  key={e + i}
                  onClick={() => {
                    setRankingType(`${i}`);
                  }}
                  style={{
                    border: rankingType === String(i) ? '1px solid transparent' : '1px solid gray',
                    backgroundColor:
                      rankingType === String(i) ? 'var(--selected-color)' : 'transparent',
                  }}
                >
                  <span style={{ color: rankingType === String(i) ? 'white' : 'black' }}>{e}</span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <GuildRankTable ranking_type={rankingType} world_name={worldName} />
    </div>
  );
}
