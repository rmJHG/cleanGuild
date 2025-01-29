'use client';

import Image from 'next/image';
import classes from './page.module.css';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import ChangeChar from './_components/ChangeChar';
import { useState } from 'react';

export default function Page() {
  const [modalState, setModalState] = useState(false);

  const { data: session } = useSession();
  const { handsData } = session!.user;

  const route = useRouter();

  console.log(modalState);
  return (
    <div className={classes.container}>
      <div className={classes.titleContainer}>
        <h2>내 정보</h2>
        <p>{session?.user.email}(으)로 로그인 중</p>
      </div>
      <div className={classes.profileContainer}>
        <h3>현재 캐릭터</h3>
        {!handsData ? (
          <div>
            <p>캐릭터 정보가 없습니다.</p>
            <p>핸즈 인증하기</p>
          </div>
        ) : (
          <div className={classes.profile}>
            <div>
              <Image src={handsData.character_image} alt="character_image" width={97} height={97} />
            </div>
            <div className={classes.profileDetails}>
              <p className={classes.charName}>{handsData.character_name}</p>
              <p>
                <span>월드명</span> {handsData.world_name}
              </p>
              <p>
                <span>길드명</span> {handsData.character_guild_name}
              </p>
            </div>
          </div>
        )}
      </div>
      <div className={classes.btnContainer}>
        <div>
          <button onClick={() => setModalState(true)}>
            <p>핸즈변경하기</p>
          </button>
          {session!.user.loginType === 'local' && (
            <button
              onClick={() => {
                route.push('/profile/setting/my/changepw');
              }}
            >
              <p>비밀번호 변경</p>
            </button>
          )}
        </div>
        <div>
          <button
            onClick={() => {
              route.push('/profile/setting/my/da');
            }}
          >
            <p>회원탈퇴</p>
          </button>
        </div>
        {modalState && <ChangeChar setModalState={setModalState} />}
      </div>
    </div>
  );
}
