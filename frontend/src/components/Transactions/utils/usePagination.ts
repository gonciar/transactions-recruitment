import { useState } from 'react';
import { ITEMS_PER_PAGE } from '../../../utils/constants';

export function usePagination<T>(
  data: T[],
): {
  data: T[];
  page: number;
  pagesCount: number;
  setPage: (page: number) => void;
} {
  const [page, setPage] = useState(0);
  const pagesCount = Math.ceil(data.length / ITEMS_PER_PAGE);
  function onSetPage(pageNumber: number) {
    setPage(Math.max(0, Math.min(pageNumber, pagesCount)));
  }
  const pageData = data.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE);

  return { data: pageData, page, pagesCount, setPage: onSetPage };
}
