'use client';

import Image from 'next/image';
import classes from './page.module.css';
import { useSession } from 'next-auth/react';

export default function Page() {
  const { data: session } = useSession();

  const { handsData } = session!.user;
  console.log(handsData);
  return (
    <div className={classes.container}>
      <div className={classes.titleContainer}>
        <h2>내 정보</h2>
        <p>{session?.user.email}(으)로 로그인 중</p>
      </div>
      <div className={classes.profileContainer}>
        <h3>메인 캐릭터</h3>
        {!handsData ? (
          <div>
            <p>메인캐릭터 정보가 없습니다.</p>
            <p>핸즈 인증하기</p>
          </div>
        ) : (
          <div className={classes.profile}>
            <div>
              <Image src={handsData.character_image} alt="character_image" width={97} height={97} />
            </div>
            <div className={classes.profileDetails}>
              <p>닉네임 {handsData.character_name}</p>
              <p>월드명 {handsData.world_name}</p>
              <p>길드명 {handsData.character_guild_name}</p>
            </div>
          </div>
        )}
      </div>
      <div className={classes.btnContainer}>
        <div>
          <button>
            <p>핸즈변경하기</p>
          </button>
          <button>
            <p>비밀번호 변경</p>
          </button>
        </div>
        <div>
          <button>
            <p>회원탈퇴</p>
          </button>
        </div>
      </div>
    </div>
  );
}
