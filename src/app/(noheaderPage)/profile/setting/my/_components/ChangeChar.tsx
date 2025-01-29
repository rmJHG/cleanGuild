'use client';

import { errorModal } from '@/app/_lib/errorModal';
import classes from './_styles/changeChar.module.css';
import { Char } from '@/types/char';
import { useEffect, useRef, useState } from 'react';

import { FaSearch } from 'react-icons/fa';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { IoIosClose } from 'react-icons/io';
import Loading from '@/app/_components/layout/Loading';
import { successModal } from '@/app/_lib/successModal';
import customFetch from '@/app/_lib/customFetch';
import NormalLoading from '@/app/_components/layout/normalLoading';

export default function ChangeChar({ setModalState }: { setModalState: (state: boolean) => void }) {
  const [isRestriced, setIsRestricted] = useState(false);
  const { data: session, update } = useSession();
  const [searchedChar, setSearchedChar] = useState<Char | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isfetching, setIsFetching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchCharHandler = async () => {
    if (!inputRef.current?.value) {
      errorModal('캐릭터명을 입력해주세요.');
      return;
    }
    if (inputRef.current?.value === session!.user.handsData!.character_name) {
      errorModal('현재 캐릭터와 동일한 캐릭터입니다.');
      return;
    }
    try {
      setIsLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/char/verifyUserMainChar`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            charName: inputRef.current?.value,
            email: session?.user.email,
            loginType: session?.user.loginType,
          }),
        }
      );
      const data = await res.json();
      console.log(data);

      if (data === '메인 캐릭터가 아닙니다.') {
        errorModal('자신의 캐릭터만 검색할 수 있습니다.');
        setIsLoading(false);
        return;
      }
      if (data === '메인 캐릭터 입니다.') {
        const fetchedData = await fetch(`/fetchData`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            character_name: inputRef.current?.value,
          }),
        });
        const charData = await fetchedData.json();
        if (fetchedData.ok) {
          setSearchedChar(charData);
        }
      }
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      errorModal(error.message);
    }
  };

  const updateCurrentCharHandler = async () => {
    setIsFetching(true);
    console.log(searchedChar?.ocid);
    try {
      const res = await customFetch({
        url: `/api/v1/user/${session?.user.loginType}/changeCurrentChar`,
        method: 'PATCH',
        loginType: session?.user.loginType as string,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentCharOcid: searchedChar?.ocid,
        }),
        token: session!.user.accessToken,
        update,
      });

      if (res === '캐릭터 변경이 완료되었습니다.') {
        successModal('캐릭터 변경이 완료되었습니다. 다시 로그인해주세요.', 2000);

        setTimeout(() => {
          signOut({ callbackUrl: '/logoutRedirect' });
        }, 2000);
      }
    } catch (error: any) {
      errorModal(error.message);
    }
  };

  useEffect(() => {
    const checkLastChangeTime = async () => {
      try {
        const res = await customFetch({
          url: `/api/v1/user/${session?.user.loginType}/checkLastCharChange?email=${session?.user.email}`,
          method: 'GET',
          loginType: session?.user.loginType as string,
          token: session!.user.accessToken,
          update,
        });

        setIsRestricted(res.hasChangedIn7Days);
      } catch (error) {
        console.log(error);
      }
    };
    checkLastChangeTime();
  }, []);
  return (
    <div
      className={classes.container}
      onClick={() => {
        setModalState(false);
      }}
    >
      <div className={classes.innerContainer} onClick={(e) => e.stopPropagation()}>
        <div className={classes.closeBtn} onClick={() => setModalState(false)}>
          <IoIosClose size={30} />
        </div>
        {isRestriced ? (
          <div className={classes.restrictedContainer}>
            <p>캐릭터를 변경한 지 일주일이 지나지 않았습니다.</p>
          </div>
        ) : (
          <>
            <div>
              <p>핸즈 인증에 사용했던 메인캐릭터를 기준으로 검색, 변경이 가능합니다.</p>
              <p>캐릭터 변경을 하시면 7일이내에 다시 변경할 수 없습니다.</p>
            </div>
            <div className={classes.searchInputContainer}>
              <input
                type="text"
                spellCheck="false"
                placeholder="캐릭터명"
                ref={inputRef}
                onKeyUp={(e) => {
                  if (e.key === 'Enter') {
                    searchCharHandler();
                  }
                }}
              />
              <FaSearch onClick={searchCharHandler} size={20} />
            </div>
            {searchedChar && (
              <div className={classes.searchedCharContainer}>
                {isLoading ? (
                  <>
                    <Loading />
                  </>
                ) : (
                  <>
                    <div>
                      <h3>검색결과</h3>
                    </div>
                    <div className={classes.profile}>
                      <div>
                        <Image
                          src={searchedChar.character_image}
                          alt="character_image"
                          width={97}
                          height={97}
                        />
                      </div>
                      <div className={classes.profileDetails}>
                        <p className={classes.charName}>{searchedChar.character_name}</p>
                        <p>
                          <span>월드명</span> {searchedChar.world_name}
                        </p>
                        <p>
                          <span>길드명</span> {searchedChar.character_guild_name}
                        </p>
                      </div>
                    </div>
                    <div className={classes.btnContainer}>
                      {isfetching ? (
                        <div className={classes.loadingContainer}>
                          <NormalLoading color="black" />
                        </div>
                      ) : (
                        <button onClick={updateCurrentCharHandler} disabled={isfetching}>
                          변경하기
                        </button>
                      )}
                    </div>
                  </>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
