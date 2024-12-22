'use client';
import { FaArrowLeft } from 'react-icons/fa6';
import { CiSearch } from 'react-icons/ci';

import classes from './_styles/managerSetting.module.css';
import { useQuery } from '@tanstack/react-query';
import getGuildManager from '@/app/_lib/getGuildManager';
import Image from 'next/image';
import Loading from '../layout/Loading';
import { FormEventHandler, useState } from 'react';
import getCharData from '@/app/_lib/getCharData';
import { Char } from '@/types/char';
import { errorModal } from '@/app/_lib/errorModal';

export default function ManagerSetting({
  closeModal,
  guild_name,
  world_name,
}: {
  closeModal: () => void;
  guild_name: string;
  world_name: string;
}) {
  const [charName, setCharName] = useState('');
  const [isSearch, setIsSearch] = useState(false);
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['guildManager', world_name, guild_name],
    queryFn: getGuildManager,
    gcTime: 5 * 60 * 1000,
    staleTime: 5 * 60 * 1000,
  });

  const { data: charData } = useQuery<Char, Error, Char, [_1: string, userName: string]>({
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
    if (charData?.character_guild_name !== guild_name) {
      errorModal('길드에 가입된 캐릭터만 추가할 수 있습니다.');
      return;
    }
    if (data.guildManagers.find((item: any) => item.character_name === charData.character_name)) {
      errorModal('이미 추가된 캐릭터입니다.');
      return;
    }
    if (data) {
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
            guildManagers: [
              ...data.guildManagers,
              {
                character_name: charData.character_name,
                character_image: charData.character_image,
                character_level: charData.character_level,
              },
            ],
          }),
        }
      );
      const json = await response.json();
      console.log(json);
      await refetch();
      setIsSearch(false);
      setCharName('');
    } else {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/guild/postGuildManager`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            world_name,
            guild_name,
            guildManagers: [
              {
                character_name: charData.character_name,
                character_image: charData.character_image,
                character_level: charData.character_level,
              },
            ],
          }),
        }
      );
      const json = await response.json();
      console.log(json);
      await refetch();
      setIsSearch(false);
      setCharName('');
    }
  };
  const deleteManager = async (character_name: string) => {
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
            character_name,
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
  return (
    <div className={classes.modal} onClick={closeModal}>
      <div className={classes.modalContent} onClick={(e) => e.stopPropagation()}>
        <div onClick={closeModal} className={classes.backBtn}>
          <FaArrowLeft color="white" size={20} /> <p>길드 관리자 설정</p>
        </div>
        <div className={classes.managerListContainer}>
          <p>현재 길드 관리자</p>
          {!data || isLoading ? (
            <Loading />
          ) : (
            <>
              <ul className={classes.managerList}>
                {data.guildManagers.map(
                  ({
                    character_image,
                    character_name,
                    character_level,
                  }: {
                    character_name: string;
                    character_image: string;
                    character_level: number;
                  }) => (
                    <li key={character_name}>
                      <div className={classes.imgWrapper}>
                        <Image src={character_image} alt={character_name} height={50} width={50} />
                      </div>
                      <div className={classes.currentManagerInfo}>
                        <p>{character_name}</p>
                        <p>Lv.{character_level}</p>
                      </div>
                      <div className={classes.deleteBtn}>
                        <button onClick={() => deleteManager(character_name)}>
                          <p>삭제</p>
                        </button>
                      </div>
                    </li>
                  )
                )}
              </ul>
            </>
          )}
        </div>
        {!data || isLoading ? (
          <Loading />
        ) : (
          data.guildManagers.length < 5 && (
            <div>
              <div className={classes.addManager}>
                <form onSubmit={searchChar}>
                  <input type="text" name="charText" placeholder="추가할 캐릭터 검색" />
                  <button type="submit">
                    <CiSearch color="white" />
                  </button>
                </form>

                {charData &&
                  (charData.error ? (
                    <div className={classes.error}>
                      <p>{charData.error}</p>
                    </div>
                  ) : (
                    <>
                      <div className={classes.resultContainer}>
                        <div>
                          <Image
                            src={charData.character_image}
                            alt={charData.character_name}
                            height={100}
                            width={100}
                          />
                        </div>
                        <div className={classes.charInfo}>
                          <p>{charData.character_name}</p>
                          <p>{charData.character_class}</p>
                          <p>Lv{charData.character_level}</p>
                        </div>
                      </div>
                      <button onClick={addManager}>
                        <p>추가</p>
                      </button>
                    </>
                  ))}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
