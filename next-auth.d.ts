import { HandsData } from '@/types/userData';
import NextAuth, { DefaultSession, DefaultUser, JWT } from 'next-auth';
import { DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth/jwt' {
  interface JWT {
    user?: {
      id?: string;
      handsData?: HandsData;
      dbId?: string;
      ocid?: string;
      isVerified: boolean;
      loginType: string;
      accessToken: string;
      refreshToken?: string;
      deleteRequest?: boolean;
    };
  }
}

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      handsData?: HandsData;
      dbId?: string;
      ocid?: string;
      currentCharOcid?: string;
      mainCharOcid?: string;
      isVerified: boolean;
      loginType: string;
      accessToken: string;
      refreshToken?: string;
      deleteRequest?: boolean;
    } & DefaultSession['user'];
  }

  interface User extends DefaultUser {
    id: string;
    handsData?: HandsData;
    dbId?: string;
    ocid?: string;
    currentCharOcid?: string;
    mainCharOcid?: string;
    accessToken: string;
    refreshToken?: string;
    loginType: string;
    isVerified: boolean;
    deleteRequest?: boolean;
  }
}
