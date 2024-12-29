'use client';
import { useRouter } from 'next/navigation';
import { FormEventHandler } from 'react';
import classes from './styles/searchBar.module.css';
import { errorModal } from '../_lib/errorModal';

export default function SearchBar() {
  const route = useRouter();

  const searchGuild: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!e.currentTarget.searchText.value) return errorModal('검색어를 입력해주세요!');
    route.push(`/search/result/${e.currentTarget.searchText.value}`);
  };

  return (
    <div className={classes.container}>
      <form onSubmit={searchGuild}>
        <input
          type="text"
          name="searchText"
          placeholder="길드 또는 캐릭터 검색하기"
          autoComplete="off"
          maxLength={20}
        />
        <button type="submit" name="searchBtn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20px"
            viewBox="0 -960 960 960"
            width="20px"
            fill="#000000"
          >
            <path d="M765-144 526-383q-30 22-65.79 34.5-35.79 12.5-76.18 12.5Q284-336 214-406t-70-170q0-100 70-170t170-70q100 0 170 70t70 170.03q0 40.39-12.5 76.18Q599-464 577-434l239 239-51 51ZM384-408q70 0 119-49t49-119q0-70-49-119t-119-49q-70 0-119 49t-49 119q0 70 49 119t119 49Z" />
          </svg>
        </button>
      </form>
    </div>
  );
}
