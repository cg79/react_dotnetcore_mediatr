import { useCallback, useEffect, useState } from "react";

export type usePaginationResult = {
  currentPage: number;
  pageCount: number;
  pageSize: number;
  previousPage: (isLoading: boolean) => void;
  nextPage: (isLoading: boolean) => void;
  changePage: (page: number, isLoading: boolean) => void;
  setPageSize: (pageSize: number) => void;
  setTotalCount: (totalCount: number) => void;
};

const usePagination = (): usePaginationResult => {
  const [pageSize, setPageSize] = useState<number>(2);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageCount, setPageCount] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(0);

  // useEffect(() => {
  //   setCurrentPage(page);
  // }, [page]);

  useEffect(() => {
    setPageCount(Math.ceil(totalCount / pageSize));
  }, [totalCount, pageSize]);

  const changePage = useCallback(
    (page: number, isLoading: boolean) => {
      if (!isLoading && page >= 0 && page < pageCount) {
        setCurrentPage(page);
      }
    },
    [setCurrentPage, pageCount]
  );

  const previousPage = useCallback(
    (isLoading: boolean) => changePage(Math.max(currentPage - 1, 0), isLoading),
    [changePage, currentPage]
  );
  const nextPage = useCallback(
    (isLoading: boolean) =>
      changePage(Math.min(currentPage + 1, pageCount - 1), isLoading),
    [changePage, currentPage, pageCount]
  );

  return {
    currentPage,
    pageCount,
    previousPage,
    nextPage,
    changePage,
    pageSize,
    setPageSize,
    setTotalCount,
  };
};

export default usePagination;
