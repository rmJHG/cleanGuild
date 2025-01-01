import { Session } from 'next-auth';
import classes from './_styles/historyList.module.css';
import { FaArrowLeft } from 'react-icons/fa6';
import { useQuery } from '@tanstack/react-query';
import getUserPostHistory from '@/app/_lib/getUserPostHistory';
import { useEffect, useState } from 'react';
export default function HistoryList({
  session,
  closeModal,
  update,
}: {
  session: Session;
  closeModal: any;
  update: any;
}) {
  const [selectedServer, setSelectedServer] = useState<string>('');

  const { data } = useQuery({
    queryKey: ['postHistory', session.user.email],
    queryFn: ({ queryKey }) => getUserPostHistory({ queryKey }, { session, update }),
  });

  const handleServerClick = (server: string) => {
    setSelectedServer(server);
  };
  const getTimeDifference = (date: any) => {
    const dateDiffInMinutes = (Date.now() - new Date(date).getTime()) / 1000 / 60;
    if (dateDiffInMinutes < 1) return '방금 전';
    if (dateDiffInMinutes < 60) return `${Math.floor(dateDiffInMinutes)}분 전`;
    if (dateDiffInMinutes < 1440) return `${Math.floor(dateDiffInMinutes / 60)}시간 전`;
    return `${Math.floor(dateDiffInMinutes / 1440)}일 전`;
  };
  useEffect(() => {
    if (data && !selectedServer) {
      const firstServer = Object.keys(data)[0];
      setSelectedServer(firstServer);
    }
  }, [data, selectedServer]);
  console.log(data);
  return (
    <div className={classes.modal} onClick={closeModal}>
      <div className={classes.modalContent} onClick={(e) => e.stopPropagation()}>
        <div onClick={closeModal} className={classes.backBtn}>
          <FaArrowLeft color="white" size={20} /> <p>포스팅 기록</p>
        </div>
        <div className={classes.historyListContainer}>
          {data &&
            Object.keys(data).map((world_name) => (
              <ul key={world_name + 'historyBtn'} className={classes.historyWorldList}>
                <li onClick={() => handleServerClick(world_name)}>
                  <p>{world_name}</p>
                </li>
              </ul>
            ))}

          <ul className={classes.historyPostList}>
            {data &&
              selectedServer &&
              data[selectedServer].map((history: any, index: number) => (
                <li key={index} className={classes.historyItem}>
                  <p className={classes.historyTitle}>{history.postData.title}</p>
                  <p>{getTimeDifference(history.postData.postDate)}</p>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// {data[server].map((history: any, index: number) => (
//   <div key={index} className={classes.historyItem}>
//     <p>{history.postData.title}</p>
//     <p>{history.content}</p>
//     <p>{history.createdAt}</p>
//   </div>
// ))}
