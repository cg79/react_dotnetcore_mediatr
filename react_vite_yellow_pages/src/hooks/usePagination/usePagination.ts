// usePagination.js
import { useState } from "react";

const usePagination = (initialPage = 1, initialPageSize = 2) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const nextPage = () => setCurrentPage((prev) => prev + 1);
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return {
    currentPage,
    pageSize,
    nextPage,
    prevPage,
    setCurrentPage,
    setPageSize,
  };
};

export default usePagination;
