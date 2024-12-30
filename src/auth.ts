import NextAuth from 'next-auth';
import credentials from 'next-auth/providers/credentials';
import kakao from 'next-auth/providers/kakao';
import { HandsData } from './types/userData';
import { cookies } from 'next/headers';
import { errorModal } from './app/_lib/errorModal';

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
  unstable_update,
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
      if (url.includes('signin?error')) {
        return url;
      }
      console.log(url, baseUrl, 'redirect');
      return '/authLoading';
    },
    signIn: async ({ account, profile, user }) => {
      console.log(account?.provider, 'account provider');
      if (account?.provider === 'credentials') {
        return true;
      }

      if (account?.provider === 'kakao') {
        try {
          const fetchekakaoUserdData = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/kakao/signin`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${account.access_token}`,
              },
            }
          );

          console.log(fetchekakaoUserdData, 'fetchekakaoUserdData');

          const responseData = await fetchekakaoUserdData.json();
          console.log(responseData, 'result');
          if (!fetchekakaoUserdData.ok) {
            await fetch('https://kapi.kakao.com/v1/user/unlink', {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${account.access_token}`,
              },
            });

            return `/signin?error=${encodeURIComponent(responseData.message)}`;
          }

          if (fetchekakaoUserdData.ok) {
            cookies().set({
              name: '_Loya',
              value: account.refresh_token as string,
              httpOnly: true,
              path: '/',
              sameSite: 'lax',
              secure: process.env.NODE_ENV === 'production',
            });
            user.ocid = responseData.result.ocid;
            user.isVerified = responseData.result.isVerified;

            return true;
          }
        } catch (error: any) {
          await fetch('https://kapi.kakao.com/v1/user/unlink', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${account.access_token}`,
            },
          });
          return `/signin?error=${encodeURIComponent(error.message)}`;
        }
      }
      return false;
    },
    jwt: async ({ token, user, account, trigger, session }) => {
      console.log('jwt 실행');
      // 로컬 토큰 갱신 로직
      if (trigger === 'update' && session) {
        console.log('update 실행');
        const { accessToken } = session;
        token.accessToken = accessToken;
        return token;
      }
      //최초 로그인 시
      if (account) {
        // Oauth 최초로그인
        if (account?.type === 'oauth' && user) {
          console.log(account, user, 'kakaoLogin');
          token.accessToken = account.access_token;
          token.refreshToken = account.refresh_token;
          token.loginType = 'kakao';

          token.ocid = user.ocid;
          token.isVerified = user.isVerified;
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
        }

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
      }

      return token;
    },
    session: async ({ session, token, user, trigger }) => {
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
        return session;
      } catch (error) {
        console.error('에러 발생:', error);
        throw new Error('세션 갱신 실패');
      }
    },
  },
  trustHost: true,
});
