import React from 'react';
import classes from './styles/pagenation.module.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const renderPageButtons = () => {
    const pageButtons = [];

    // 첫 번째 ~ 세 번째 페이지 근처
    if (currentPage <= 3) {
      for (let i = 1; i <= Math.min(4, totalPages); i++) {
        pageButtons.push(
          <li key={i}>
            <button
              onClick={() => onPageChange(i)}
              style={{
                color: currentPage === i ? 'white' : 'black',
                backgroundColor: currentPage === i ? 'var(--header-color)' : '',
              }}
            >
              <p>{i}</p>
            </button>
          </li>
        );
      }
      if (totalPages > 4) {
        pageButtons.push(<span key="dots-end">...</span>);
        pageButtons.push(
          <li key={totalPages}>
            <button onClick={() => onPageChange(totalPages)}>
              <p>{totalPages}</p>
            </button>
          </li>
        );
      }
    }
    // 마지막 세 페이지 근처
    else if (currentPage >= totalPages - 2) {
      if (totalPages > 4) {
        pageButtons.push(
          <li key={1}>
            <button onClick={() => onPageChange(1)}>
              <p>1</p>
            </button>
          </li>
        );
        pageButtons.push(<span key="dots-start">...</span>);
      }
      for (let i = Math.max(totalPages - 3, 1); i <= totalPages; i++) {
        pageButtons.push(
          <li key={i}>
            <button
              onClick={() => onPageChange(i)}
              style={{
                color: currentPage === i ? 'white' : 'black',
                backgroundColor: currentPage === i ? 'var(--header-color)' : '',
              }}
            >
              <p>{i}</p>
            </button>
          </li>
        );
      }
    }
    // 중간 페이지
    else {
      pageButtons.push(
        <li key={1}>
          <button onClick={() => onPageChange(1)}>
            <p>1</p>
          </button>
        </li>
      );
      pageButtons.push(<span key="dots-start">...</span>);

      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pageButtons.push(
          <li key={i}>
            <button
              onClick={() => onPageChange(i)}
              style={{
                color: currentPage === i ? 'white' : 'black',
                backgroundColor: currentPage === i ? 'var(--header-color)' : '',
              }}
            >
              <p>{i}</p>
            </button>
          </li>
        );
      }

      pageButtons.push(<span key="dots-end">...</span>);
      pageButtons.push(
        <li key={totalPages}>
          <button onClick={() => onPageChange(totalPages)}>
            <p>{totalPages}</p>
          </button>
        </li>
      );
    }

    return pageButtons;
  };

  return <ul className={classes.pageBtnContainer}>{renderPageButtons()}</ul>;
};

export default Pagination;
