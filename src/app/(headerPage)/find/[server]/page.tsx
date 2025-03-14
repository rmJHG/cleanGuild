'use client';

import Guild from '../_component/Guild';
import ServerList from '../_component/ServerList';
import classes from './page.module.css';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { getPostData } from './_lib/getPostData';
import { GuildPostData, GuildPostDataList } from '@/types/guildPostData';
import Loading from '@/app/_components/layout/Loading';
import { useEffect, useRef, useState } from 'react';

import { MdFilterAlt } from 'react-icons/md';
import Pagination from '../_component/Pagenation';
import { totalServerList } from '@/app/serverList';
import { useRouter } from 'next/navigation';

type Props = {
  params: {
    server: string;
  };
};
const guildTypeList = ['전체', '친목', '자유', '유니온', '랭킹', '솔로'];
const childGuildList = ['전체', '유', '무'];
const noblePointList = ['전체', '~30', '31~45', '46~50', '51~59', '60'];
const limitedSuroPointList = [
  '전체',
  '1000 이하',
  '1000~3000',
  '3000~5000',
  '5000~10000',
  '10000 이상',
];
export default function DataTable({ params }: Props) {
  const decodedServer = decodeURIComponent(params.server);
  const router = useRouter();
  if (!Object.keys(totalServerList).includes(decodedServer)) {
    router.push('/');
  }

  const [page, setPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [guildType, setGuildType] = useState('전체');
  const [childGuild, setChildGuild] = useState('전체');
  const [noblePoint, setNoblePoint] = useState('전체');
  const [suroPoint, setSuroPoint] = useState('전체');
  const [sortOrder, setSortOrder] = useState<boolean>(true);
  const modalRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const handleGuildTypeClick = (type: string) => {
    setGuildType(type);
  };

  const handleChildGuildClick = (type: string) => {
    setChildGuild(type);
  };

  const handleNoblePointClick = (point: string) => {
    setNoblePoint(point);
  };
  const handleLimitedSuroPointClick = (point: string) => {
    setSuroPoint(point);
  };
  const handleSortOrderClick = (order: boolean) => {
    setSortOrder(order);
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalRef, buttonRef]);

  const { data, refetch } = useQuery<GuildPostDataList, Error, GuildPostDataList, [string, string]>(
    {
      queryKey: ['guildPost', decodedServer],
      queryFn: ({ queryKey }) => getPostData({ queryKey }, { page }),
      staleTime: 0,
      gcTime: 1 * 60 * 1000,
    }
  );

  const filteredData =
    data &&
    data.recruitments.filter((e) => {
      const isGuildTypeMatch =
        !guildType || guildType === '전체' || e.postData.guildType === guildType;
      const isChildGuildMatch =
        !childGuild ||
        childGuild === '전체' ||
        (childGuild === '유' ? e.postData.childGuild : !e.postData.childGuild);
      const noblePointValue = e.postData.currentNoblePoint;
      const isNoblePointMatch =
        !noblePoint ||
        noblePoint === '전체' ||
        (noblePoint === '~30' && noblePointValue <= 30) ||
        (noblePoint === '31~45' && noblePointValue > 30 && noblePointValue <= 45) ||
        (noblePoint === '46~50' && noblePointValue > 45 && noblePointValue <= 50) ||
        (noblePoint === '51~59' && noblePointValue > 50 && noblePointValue <= 59) ||
        (noblePoint === '60' && noblePointValue >= 60);

      const suroPointValue = e.postData.limitedSuroPoint;
      const isSuroPointMatch =
        !suroPoint ||
        suroPoint === '전체' ||
        (suroPoint === '1000 이하' && suroPointValue <= 1000) ||
        (suroPoint === '1000~3000' && suroPointValue > 1000 && suroPointValue <= 3000) ||
        (suroPoint === '3000~5000' && suroPointValue > 3000 && suroPointValue <= 5000) ||
        (suroPoint === '5000~10000' && suroPointValue > 5000 && suroPointValue <= 10000) ||
        (suroPoint === '10000 이상' && suroPointValue > 10000);

      return isGuildTypeMatch && isChildGuildMatch && isNoblePointMatch && isSuroPointMatch;
    });
  const sortedData = filteredData?.sort((a, b) => {
    if (sortOrder) {
      return b.postData.postDate - a.postData.postDate;
    } else {
      return a.postData.postDate - b.postData.postDate;
    }
  });

  const handlePage = async (page: number) => {
    setPage(page);
  };

  useEffect(() => {
    refetch();
  }, [page]);

  console.log(data);
  return (
    <div className={classes.container}>
      <div className={classes.serverListWrapper}>
        <ServerList clicked={decodedServer as string} />
      </div>

      <div className={classes.optionContainer}>
        <div className={classes.btnContainer}>
          <button
            onClick={() => {
              handleSortOrderClick(true);
            }}
          >
            <p style={{ color: sortOrder ? 'black' : '#b4b4b4' }}> 최신 순</p>
          </button>
          <button
            onClick={() => {
              handleSortOrderClick(false);
            }}
          >
            <p style={{ color: !sortOrder ? 'black' : '#b4b4b4' }}>오래된 순</p>
          </button>
        </div>
        <div className={classes.filterContainer}>
          <div ref={buttonRef}>
            <MdFilterAlt
              color={isOpen ? 'rgb(180,180,180)' : 'black'}
              size={23}
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            />
          </div>

          {isOpen && (
            <div className={classes.conditionContainer} ref={modalRef}>
              <button
                onClick={() => {
                  setGuildType('전체');
                  setChildGuild('전체');
                  setNoblePoint('전체');
                  setSuroPoint('전체');
                }}
              >
                초기화
              </button>
              <div className={classes.conditions}>
                <p>길드타입</p>
                <div>
                  {guildTypeList.map((type) => (
                    <button
                      key={type}
                      style={{ backgroundColor: guildType === type ? 'orange' : 'gray' }}
                      onClick={() => handleGuildTypeClick(type)}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              <div className={classes.conditions}>
                <p>부캐길드</p>
                <div>
                  {childGuildList.map((type) => (
                    <button
                      key={type}
                      style={{ backgroundColor: childGuild === type ? 'orange' : 'gray' }}
                      onClick={() => handleChildGuildClick(type)}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              <div className={classes.conditions}>
                <p>노블포인트</p>
                <div>
                  {noblePointList.map((type) => (
                    <button
                      key={type}
                      style={{ backgroundColor: noblePoint === type ? 'orange' : 'gray' }}
                      onClick={() => handleNoblePointClick(type)}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              <div className={classes.conditions}>
                <p>수로제한점수</p>
                <div>
                  {limitedSuroPointList.map((type) => (
                    <button
                      key={type}
                      style={{ backgroundColor: suroPoint === type ? 'orange' : 'gray' }}
                      onClick={() => handleLimitedSuroPointClick(type)}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={classes.guildPostListContainer}>
        {!sortedData ? (
          <div
            style={{ flex: '1', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            <Loading />
          </div>
        ) : sortedData.length < 1 ? (
          <div
            style={{ flex: '1', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            <p>홍보게시글이 없습니다.</p>
          </div>
        ) : (
          <>
            <ul className={classes.guildPostList}>
              {sortedData.map((e) => {
                return (
                  <li key={e._id}>
                    <Link href={`/find/${decodedServer}/${e._id}`} prefetch={false}>
                      <Guild data={e} />
                    </Link>
                  </li>
                );
              })}
            </ul>
            <Pagination
              currentPage={page}
              totalPages={data!.totalPages}
              onPageChange={handlePage}
            />
          </>
        )}
      </div>
    </div>
  );
}
