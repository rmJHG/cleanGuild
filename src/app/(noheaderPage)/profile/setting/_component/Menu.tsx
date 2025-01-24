'use client';
import { useState } from 'react';

import { MdHome } from 'react-icons/md';
import { CiUser } from 'react-icons/ci';
import { IoLogOutOutline } from 'react-icons/io5';

import { usePathname, useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

const icons = {
  MdHome,
  CiUser,
  IoLogOutOutline,
};
type Props = {
  iconName: keyof typeof icons;
  text: string;
};
export default function Menu({ iconName, text }: Props) {
  const { data: session } = useSession();
  const Icon = icons[iconName];
  const [isHover, setIsHover] = useState(false);
  const route = useRouter();
  const pathName = usePathname();

  return (
    <div
      onClick={async () => {
        if (text === 'signout') {
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
          signOut({ callbackUrl: '/signOut' });
        }
        if (text === 'profile') {
          route.push('/profile/setting/my');
        }
        if (text === 'home') {
          route.push('/');
        }
        if (text === '비밀번호변경') {
          route.push('/profile/setting/password');
        }
      }}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className="menu-item"
      style={{
        padding: '5px 8px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px', // 아이콘과 텍스트 간 간격
        position: 'relative',
        backgroundColor:
          pathName === `/profile/setting/${text}` ? 'var(--background-color)' : 'transparent',
      }}
    >
      <Icon color={pathName === `/profile/setting/${text}` ? 'black' : 'white'} size={25} />
      {isHover && (
        <p
          style={{
            position: 'absolute',
            left: '110%',
            backgroundColor: 'black',
            color: 'white',
            padding: '5px',
            borderRadius: '5px',
            whiteSpace: 'nowrap',
            margin: 0, // 기본 p 태그의 여백 제거
          }}
        >
          {text === 'home'
            ? '홈으로'
            : text === 'my'
            ? '내 프로필'
            : text === 'signout'
            ? '로그아웃'
            : '비밀번호 변경'}
        </p>
      )}
    </div>
  );
}
