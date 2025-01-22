'use client';

import { Dispatch, RefObject, SetStateAction, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import classes from './_styles/profileMenu.module.css';
import { Session } from 'next-auth';
import { ServerName, totalServerList } from '../../serverList';

import { IoIosLogOut } from 'react-icons/io';
import { CiSettings } from 'react-icons/ci';

import { useQuery } from '@tanstack/react-query';
import { getGuildData } from '../../_lib/getGuildData';
import { signOut, useSession } from 'next-auth/react';
import ManagerSetting from './ManagerSetting';
import getGuildManager from '@/app/_lib/getGuildManager';

import { useRouter } from 'next/navigation';
import { RiFileEditLine } from 'react-icons/ri';

export default function ProfileMenu({
  setIsOpen,
  btnRef,
  session,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  btnRef: RefObject<HTMLParagraphElement>;
  session: Session;
}) {
  const { update } = useSession();
  const route = useRouter();
  const user = session!.user;
  const { handsData } = session!.user;
  const wrapperRef = useRef<HTMLDivElement>(null);
  const world_icon = totalServerList[handsData!.world_name as ServerName];

  const { data: guildData, isLoading: guildDataLoading } = useQuery({
    queryKey: ['guildData', handsData!.world_name, handsData!.character_guild_name],
    queryFn: getGuildData,
    staleTime: 5 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
  const { data: managerData, isLoading: managerDataLoading } = useQuery({
    queryKey: ['guildManager', handsData!.world_name, handsData!.character_guild_name],
    queryFn: ({ queryKey }) => getGuildManager({ queryKey }, { session, update }),
    gcTime: 5 * 60 * 1000,
    staleTime: 5 * 60 * 1000,
  });
  const [isManagerSettingOpen, setIsManagerSettingOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (btnRef.current?.contains(event.target as Node)) return null;
      if (event.target == btnRef.current) {
        setIsOpen(false);
        return;
      }
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [btnRef, wrapperRef, setIsOpen]);

  const logout = async () => {
    try {
      if (session?.user.loginType === 'kakao') {
        await fetch(
          `https://kauth.kakao.com/oauth/logout?client_id=${process.env.NEXT_PUBLIC_AUTH_KAKAO_ID}&logout_redirect_uri=${process.env.NEXT_PUBLIC_AUTH_KAKAO_LOGOUT_REDIRECT_URI}&state=${process.env.NEXT_PUBLIC_AUTH_KAKAO_STATE}`
        );
        await fetch('https://kapi.kakao.com/v1/user/unlink', {
          headers: {
            Authorization: `Bearer ${session.user.accessToken}`,
          },
        });
      }

      // 서버 로그아웃 API 호출
      await fetch(`/api/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });

      await signOut({
        redirect: true,
        callbackUrl: '/signOut',
      });
    } catch (error) {
      console.error('로그아웃 중 오류 발생:', error);
    }
  };
  const openSettingManager = () => {
    setIsManagerSettingOpen(true);
  };
  const closeModal = () => {
    setIsManagerSettingOpen(false);
    setIsHistoryOpen(false);
  };

  return (
    <div className={classes.profileMenu} ref={wrapperRef}>
      {!isManagerSettingOpen && !isHistoryOpen && (
        <>
          <div className={classes.profileContainer}>
            <div className={classes.imgWrapper}>
              <Image
                src={handsData?.character_image as string}
                alt="character_image"
                width={100}
                height={100}
              />
            </div>
            <div className={classes.textContainer}>
              <p className={classes.charName}>
                <Image src={world_icon} alt="world_icon" width={20} height={20} />
                {handsData?.character_name}
              </p>
              <p className={classes.userEmail}>{user.email}</p>
            </div>
          </div>

          <div
            className={`${classes.menuContainer} ${
              !guildDataLoading &&
              !(
                managerData?.some((item: string) => item === user.ocid) ||
                guildData.guild_master_name === handsData?.character_name
              ) &&
              !managerDataLoading &&
              handsData!.character_name !== guildData?.guild_master_name
                ? classes.noBorder
                : ''
            }`}
          >
            {!guildDataLoading &&
              (managerData?.some((item: string) => item === user.ocid) ||
                guildData.guild_master_name === handsData?.character_name) && (
                <div
                  onClick={() => {
                    route.push('/posthistory');
                  }}
                >
                  <RiFileEditLine color="white" /> <p>내가 게시한 글 관리</p>
                </div>
              )}
            {!managerDataLoading && handsData!.character_name === guildData?.guild_master_name && (
              <div onClick={openSettingManager}>
                <CiSettings color="white" /> <p>길드 관리자 설정</p>
              </div>
            )}
          </div>

          <div className={classes.menuContainer}>
            <div
              onClick={() => {
                route.push('/profile/setting/my');
              }}
            >
              <CiSettings color="white" /> <p>프로필 설정</p>
            </div>
            <div onClick={logout}>
              <IoIosLogOut color="white" /> <p>로그아웃</p>
            </div>
          </div>
        </>
      )}
      {isManagerSettingOpen && (
        <ManagerSetting
          session={session}
          closeModal={closeModal}
          guild_name={handsData!.character_guild_name}
          world_name={handsData!.world_name}
        />
      )}
    </div>
  );
}

{
  /* <div onClick={openSettingManager}>
              <CiSettings color="white" /> <p>길드 관리자 설정 test</p>
            </div> */
}
