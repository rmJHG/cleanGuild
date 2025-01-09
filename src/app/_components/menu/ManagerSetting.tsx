'use client';
import { FaArrowLeft } from 'react-icons/fa6';
import { CiSearch } from 'react-icons/ci';

import classes from './_styles/managerSetting.module.css';
import { QueryKey, useQueries, useQuery } from '@tanstack/react-query';
import getGuildManager from '@/app/_lib/getGuildManager';
import Image from 'next/image';
import Loading from '../layout/Loading';
import { FormEventHandler, useEffect, useState } from 'react';

import { Char } from '@/types/char';
import { errorModal } from '@/app/_lib/errorModal';
import { useSession } from 'next-auth/react';
import { Session } from 'next-auth';
import getCharDataForOcid from '@/app/_lib/getCharDataForOcid';
import NormalLoading from '../layout/normalLoading';
import getCharData from '@/app/_hook/getCharData';

export default function ManagerSetting({
  session,
  closeModal,
  guild_name,
  world_name,
}: {
  session: Session;
  closeModal: () => void;
  guild_name: string;
  world_name: string;
}) {
  const { update } = useSession();
  const [charName, setCharName] = useState('');
  const [isSearch, setIsSearch] = useState(false);
  const { data, isLoading, refetch, isError, error } = useQuery({
    queryKey: ['guildManager', world_name, guild_name],
    queryFn: ({ queryKey }) => getGuildManager({ queryKey }, { session, update }),
    gcTime: 5 * 60 * 1000,
    staleTime: 5 * 60 * 1000,
  });

  const { data: charData, isLoading: charDataLoading } = useQuery<
    Char,
    Error,
    Char,
    [_1: string, userName: string]
  >({
    queryKey: ['char', charName],
    queryFn: getCharData,
    enabled: isSearch,
    staleTime: 1 * 60 * 1000,
    gcTime: 3 * 60 * 1000,
  });

  const searchChar: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setIsSearch(true);
    setCharName(e.currentTarget.charText.value);
  };
  const addManager = async () => {
    if (charData?.character_name === session.user.handsData?.character_name) {
      errorModal('자신은 관리자로 추가할 수 없습니다.');
      return;
    }
    if (charData?.character_guild_name !== guild_name) {
      errorModal('길드에 가입된 캐릭터만 추가할 수 있습니다.');
      return;
    }
    if (data && data.find((item: any) => item.character_name === charData.character_name)) {
      errorModal('이미 추가된 캐릭터입니다.');
      return;
    }
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/guild/updateGuildManager`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            world_name,
            guild_name,
            guildManagers: [...data, charData.ocid],
          }),
        }
      );
      const json = await response.json();
      console.log(json);
      await refetch();
      setIsSearch(false);
      setCharName('');
    } catch (error) {
      console.error(error);
    }
  };
  const deleteManager = async (ocid: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/guild/deleteGuildManager`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            world_name,
            guild_name,
            ocid,
          }),
        }
      );
      const data = await response.json();
      console.log(data);
      await refetch();
    } catch (error) {
      console.error(error);
    }
  };
  if (charData) {
    console.log(charData);
  }
  console.log(data);
  const managerData = useQueries({
    queries: data.map((ocid: string) => ({
      queryKey: ['charForOcid', ocid],
      queryFn: ({ queryKey }: { queryKey: QueryKey }) => getCharDataForOcid({ queryKey }, { ocid }),
      gcTime: 5 * 60 * 1000,
      staleTime: 5 * 60 * 1000,
    })),
  });

  return (
    <div className={classes.modal} onClick={closeModal}>
      <div className={classes.modalContent} onClick={(e) => e.stopPropagation()}>
        <div onClick={closeModal} className={classes.backBtn}>
          <FaArrowLeft color="white" size={20} /> <p>길드 관리자 설정</p>
        </div>
        <div className={classes.managerListContainer}>
          <p>현재 길드 관리자</p>
          {isLoading ? (
            <div style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
              <NormalLoading />
            </div>
          ) : !data ? (
            <p>길드 관리자가 없습니다.</p>
          ) : (
            <>
              <ul className={classes.managerList}>
                <li>
                  <div className={classes.imgWrapper}>
                    <Image
                      src={session.user.handsData?.character_image as string}
                      alt="myHandsImage"
                      height={50}
                      width={50}
                    />
                  </div>
                  <div className={classes.currentManagerInfo}>
                    <p>{session.user.handsData!.character_name}</p>
                  </div>
                  <div>
                    <p>길드마스터</p>
                  </div>
                </li>
                {managerData?.map((query, index) => {
                  if (query.isLoading) {
                    return (
                      <li
                        key={index}
                        style={{ display: 'flex', justifyContent: 'center', width: '100%' }}
                      >
                        <NormalLoading />
                      </li>
                    );
                  }

                  if (query.isError) {
                    return (
                      <li key={index}>
                        <p>오류 발생: {query.error.message}</p>
                      </li>
                    );
                  }
                  console.log(managerData);
                  if (query.data) {
                    const manager = query.data as Char; // 성공적으로 가져온 데이터
                    return (
                      <li key={index}>
                        <div className={classes.imgWrapper}>
                          <Image
                            src={manager!.character_image}
                            alt={manager!.character_name}
                            height={50}
                            width={50}
                          />
                        </div>
                        <div className={classes.currentManagerInfo}>
                          <p>{manager!.character_name}</p>
                          <p>Lv.{manager!.character_level}</p>
                        </div>
                        <div className={classes.deleteBtn}>
                          <button onClick={() => deleteManager(manager!.ocid)}>
                            <p>삭제</p>
                          </button>
                        </div>
                      </li>
                    );
                  }
                  return null;
                })}
              </ul>
            </>
          )}
        </div>
        {isLoading ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              height: '100%',
              minHeight: '100px',
            }}
          >
            <NormalLoading />
          </div>
        ) : (
          (!data || data.length < 4) && (
            <div>
              <div className={classes.addManager}>
                <form onSubmit={searchChar}>
                  <input
                    type="text"
                    name="charText"
                    placeholder="추가할 캐릭터 검색"
                    autoComplete="off"
                  />
                  <button type="submit">
                    <CiSearch color="white" />
                  </button>
                </form>
                {charDataLoading && (
                  <div style={{ display: 'flex', justifyContent: 'center', height: '100px' }}>
                    <NormalLoading />
                  </div>
                )}
                {charData?.error && (
                  <div
                    style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <p>{charData.error}</p>
                  </div>
                )}
                {charData && !charData.error && (
                  <div className={classes.resultContainer}>
                    <div className={classes.resultCharContainer}>
                      <div>
                        <Image
                          src={charData.character_image}
                          alt={charData.character_name}
                          height={100}
                          width={100}
                        />
                      </div>
                      <div className={classes.resultCharInfo}>
                        <p>{charData.character_name}</p>
                        <p>{charData.character_class}</p>
                        <p>Lv{charData.character_level}</p>
                      </div>
                    </div>
                    <div className={classes.resultAddBtnWrapper}>
                      <button onClick={addManager}>
                        <p>추가</p>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
