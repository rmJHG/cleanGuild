import { auth } from '@/auth';
import HistoryDetail from './_component/HistoryDetail';
import { redirect } from 'next/navigation';

export default async function Page({ params }: { params: { postId: string; world_name: string } }) {
  const session = await auth();
  if (!session) {
    return redirect('/');
  }
  const { postId, world_name } = params;
  console.log(postId, world_name);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/guild/getGuildRecruitmentPoster`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        world_name: decodeURIComponent(world_name),
        _id: postId,
      }),
    }
  );

  const data = await res.json();

  return <HistoryDetail data={data} session={session} />;
}
