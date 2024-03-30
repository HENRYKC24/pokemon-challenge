import React, { useMemo } from 'react';
import css from './styles.module.scss';
import { useSelector } from 'react-redux';
import { selectLoading } from '../../redux/pokemon';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  setPage,
}): JSX.Element | null => {
  const pages = useMemo(() => {
    if (totalPages < 2) {
      return [];
    }

    return [...new Array(totalPages)].map((_, idx) => idx + 1);
  }, [totalPages]);

  const loading = useSelector(selectLoading);

  if (totalPages < 2) {
    return null;
  }

  return (
    <div className={css.container}>
      <div className={`${css.pagination} ${loading ? css.loading : ''}` }>
        {pages.map((page) => (
          <button
            key={page}
            data-page={page}
            aria-label={`Page ${page}`}
            className={`${css.page_btn} ${page === currentPage ? css.active : ''}`}
            onClick={() => setPage(page)}
          >
          </button>
        ))}
      </div>
    </div>
  );
};

export default Pagination;
