import { auth } from '@/auth';
import Link from 'next/link';
import Logout from '../Logout';
import UserProfileButton from './UserProfileButton';

export default async function UserActionBtn() {
  const session = await auth();

  if (session && session.user.handsData) {
    return (
      <div>
        <UserProfileButton
          session={session}
          characterName={session.user.handsData.character_name}
        />
      </div>
    );
  }
  if (session) {
    return (
      <div>
        <Logout />
      </div>
    );
  }
  return (
    <div>
      <Link href="/signin">
        <p>로그인</p>
      </Link>
    </div>
  );
}
