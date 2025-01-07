'use client';

import { useSession } from 'next-auth/react';
import classes from './_styles/postHistory.module.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { FaAngleDown } from 'react-icons/fa';
import customFetch from '@/app/_lib/customFetch';
import { errorModal } from '@/app/_lib/errorModal';

export default function PostHistory({
  selectedServer,
  history,
  refetch,
}: {
  selectedServer: string;
  history: any;
  refetch: any;
}) {
  const { data: session, update } = useSession();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const route = useRouter();
  const handlePostHistoryClick = (historyId: string) => {
    route.push(`/find/${selectedServer}/${historyId}`);
  };
  const getTimeDifference = (date: any) => {
    const dateDiffInMinutes = (Date.now() - new Date(date).getTime()) / 1000 / 60;
    if (dateDiffInMinutes < 1) return '방금 전';
    if (dateDiffInMinutes < 60) return `${Math.floor(dateDiffInMinutes)}분 전`;
    if (dateDiffInMinutes < 1440) return `${Math.floor(dateDiffInMinutes / 60)}시간 전`;
    return `${Math.floor(dateDiffInMinutes / 1440)}일 전`;
  };

  const deletePost = async () => {
    console.log(history._id, decodeURIComponent(selectedServer));
    try {
      const res = await customFetch({
        url: '/api/v1/guild/deleteGuildRecruitmentPoster',
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          loginType: session!.user.loginType,
        },
        body: JSON.stringify({
          _id: history._id,
          world_name: decodeURIComponent(selectedServer),
        }),
        loginType: session!.user.loginType,
        update,
        token: session!.user.accessToken,
      });
      if (res.message === '삭제 완료') {
        refetch();
      }
    } catch (error) {
      errorModal('게시글 삭제에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <li
      className={classes.historyItem}
      onClick={() => {
        setIsOpen(!isOpen);
      }}
    >
      <div className={classes.historyContainer}>
        <div className={classes.historyContent}>
          <p className={classes.historyTitle}>{history.postData.title}</p>
          <p>{getTimeDifference(history.postData.postDate)}</p>
        </div>
        <FaAngleDown className={`${classes.angleDown} ${isOpen ? classes.open : ''}`} />
      </div>

      {isOpen && (
        <div className={classes.historyBtnContainer}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePostHistoryClick(history._id);
            }}
          >
            이동
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              route.push(`/profile/setting/posthistory/edit/${history._id}/${selectedServer}`);
            }}
          >
            수정
          </button>
          <button onClick={deletePost}>삭제</button>
        </div>
      )}
    </li>
  );
}
