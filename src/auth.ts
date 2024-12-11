import NextAuth from 'next-auth';
import credentials from 'next-auth/providers/credentials';
import kakao from 'next-auth/providers/kakao';
import { HandsData } from './types/userData';
import isTokenExpired from './app/_lib/isTokenExpired';
import { cookies } from 'next/headers';

let isRefreshingToken = false;
export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  providers: [
    kakao({
      clientId: process.env.AUTH_KAKAO_ID,
      clientSecret: process.env.AUTH_KAKAO_SECRET,
    }),
    credentials({
      authorize: async (credentials) => {
        try {
          const { email, password } = credentials;
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!email || !password) {
            console.error('이메일 혹은 비밀번호가 비어있습니다.');
            throw new Error('이메일 혹은 비밀번호가 비어있습니다');
          }

          if (!emailRegex.test(email as string)) {
            throw new Error('올바른 이메일 형식이 아닙니다');
          }

          const fetchedData = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/local/signin`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },

              body: JSON.stringify({ email, password }),
            }
          );

          const res = await fetchedData.json();

          if (!fetchedData.ok) {
            throw new Error(res.message || '로그인 요청이 실패했습니다');
          }
          if (!res.profile) {
            throw new Error('유저 프로필을 찾을 수 없습니다');
          }
          const setCookieHeader = fetchedData.headers.get('set-cookie');
          if (setCookieHeader) {
            const refreshToken = setCookieHeader.split(';')[0].split('=')[1];
            if (refreshToken) {
              cookies().set({
                name: '_Loya',
                value: refreshToken,
                httpOnly: true,
                path: '/',
                sameSite: 'lax',
                secure: process.env.NODE_ENV === 'production',
              });
            }
          }

          const user = res.profile;
          return user;
        } catch (error) {
          throw error;
        }
      },
    }),
  ],
  pages: {
    signIn: '/signin',
    error: '/signin', // 에러 페이지 지정
    signOut: '/signOut', // 로그아웃 후 리다이렉트 페이지
  },
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60,
    updateAge: 1 * 60 * 60,
  },

  callbacks: {
    redirect: async ({ url, baseUrl }) => {
      // 로그아웃 URL인 경우 홈페이지로 리다이렉트
      if (url.includes('signOut')) {
        return '/';
      }
      return '/authLoading';
    },
    signIn: async ({ account, profile, user }) => {
      console.log(account?.provider, 'account');
      if (account?.provider === 'credentials') {
        //일반 로그인의 경우 유저 정보가 이미 있음
        return true;
      }

      if (account?.provider === 'kakao') {
        try {
          const fetchedData = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/kakao/signin`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${account.access_token}`,
              },
            }
          );

          if (!fetchedData.ok) {
            throw new Error('카카오 로그인 실패');
          }

          const responseData = await fetchedData.json();
          console.log('fetchedData', responseData);
          return true;
        } catch (error) {
          console.error('에러 발생:', error);
          throw new Error('카카오 로그인 에러');
        }
      }
      return true;
    },
    jwt: async ({ token, user, account }) => {
      //최초 로그인 시
      if (account) {
        // Oauth 최초로그인
        if (account?.type === 'oauth' && user) {
          token.accessToken = account.access_token;
          token.refreshToken = account.refresh_token;
          token.loginType = 'kakao';
          return token;
        }

        // 로컬 최초로그인
        if (account?.type === 'credentials' && user) {
          token.accessToken = user.accessToken;
          token.refreshToken = user.refreshToken;
          token.loginType = 'local';
          token.email = user.email;
          token.ocid = user.ocid;
          token.isVerified = user.isVerified;

          // 사용자 데이터 가져오기
          if (token.ocid) {
            const getCharData = await fetch(`${process.env.NEXT_PUBLIC_FETCH_URL}/api/user`, {
              method: 'POST',
              body: JSON.stringify({ ocid: token.ocid }),
            });
            if (getCharData.ok) {
              const { character_name, character_image, character_guild_name, world_name } =
                await getCharData.json();

              const handsData = {
                character_name,
                character_image,
                character_guild_name,
                world_name,
              };

              token.handsData = handsData;
            }
          }
          return token;
        }
      }
      if (token.loginType === 'local') {
        console.log('jwt 실행');

        // 토큰 갱신 로직
        if (token.accessToken && isTokenExpired(token.accessToken as string)) {
          // console.log('현재 토큰 : ', token.accessToken);
          console.log('현재 토큰 상태:', isTokenExpired(token.accessToken as string));
          if (isRefreshingToken) {
            return token; // 이전 갱신 요청이 끝날 때까지 대기
          }
          console.log('토큰 갱신 시작');
          isRefreshingToken = true; // 갱신 시작

          try {
            const response = await fetch(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/local/refreshToken`,
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Cookie: `_Loya=${cookies().get('_Loya')?.value || ''}`,
                },
                credentials: 'include',
              }
            );

            const json = await response.json();
            console.log(json, 'json');
            if (response.ok) {
              console.log('토큰 갱신 성공');
              token.accessToken = json.accessToken;
            }
            return token;
          } catch (error) {
            console.error('토큰 갱신 실패', error);
            throw new Error('토큰 갱신 실패');
          } finally {
            isRefreshingToken = false; // 갱신 완료
          }
        }
        return token;
      }
      return token;
    },
    session: async ({ session, token, user }) => {
      try {
        console.log('session 실행');

        session.user = {
          ...session.user,
          accessToken: token.accessToken as string,
          refreshToken: token.refreshToken as string,
          email: token.email as string,
          loginType: token.loginType as string,
          ocid: token.ocid as string,
          handsData: token.handsData as HandsData,
          isVerified: token.isVerified as boolean,
        };
        console.log('로그인완료');
        return session;
      } catch (error) {
        console.error('에러 발생:', error);
        throw new Error('세션 갱신 실패');
      }
    },
  },
  trustHost: true,
});
