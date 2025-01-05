'use client';

import classes from './page.module.css';

import { useQuery } from '@tanstack/react-query';
import getUserPostHistory from '@/app/_lib/getUserPostHistory';
import { useEffect, useState } from 'react';
import NormalLoading from '@/app/_components/layout/normalLoading';
import { ServerName, totalServerList } from '@/app/serverList';
import Image from 'next/image';

import { useSession } from 'next-auth/react';
import PostHistory from './_component/PostHistory';

export default function HistoryList() {
  const { data: session, update } = useSession();

  const [selectedServer, setSelectedServer] = useState<string>('');

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['postHistory', session!.user.email],
    queryFn: ({ queryKey }) => getUserPostHistory({ queryKey }, { session, update }),
  });

  const handleServerClick = (server: string) => {
    setSelectedServer(server);
  };

  const getServerImage = (worldName: ServerName) => {
    return totalServerList[worldName]; // 기본 이미지 처리
  };
  useEffect(() => {
    if (data && !selectedServer) {
      const firstServer = Object.keys(data)[0];
      setSelectedServer(firstServer);
    }
  }, [data, selectedServer]);

  console.log(data);
  return (
    <div className={classes.container}>
      <div className={classes.historyHeader}>
        <p>홍보한 지 7일이 지난 글은 삭제됩니다.</p>
      </div>
      <div className={classes.historyContainer}>
        <ul className={classes.historyWorldList}>
          {data &&
            Object.keys(data).map((world_name) => (
              <li
                key={world_name + 'historyBtn'}
                onClick={() => handleServerClick(world_name)}
                className={classes.selectWorldBtn}
                style={{
                  backgroundColor:
                    selectedServer === world_name ? 'var(--border-color)' : 'transparent',
                }}
              >
                <Image
                  src={getServerImage(world_name as ServerName)}
                  alt={world_name + 'icon'}
                  width={16}
                  height={16}
                />
                <p>{world_name}</p>
              </li>
            ))}
        </ul>
        <ul className={classes.historyPostList}>
          {!data && isLoading && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
              }}
            >
              <NormalLoading />
            </div>
          )}
          {data &&
            selectedServer &&
            data[selectedServer].map((history: any, index: number) => {
              return (
                <PostHistory
                  history={history}
                  selectedServer={selectedServer}
                  refetch={refetch}
                  key={index + `history`}
                />
              );
            })}
        </ul>
      </div>
    </div>
  );
}
