const Pagination = ({
  currentPage,
  pageSize,
  totalCount,
  nextPage,
  prevPage,
}: {
  currentPage: number;
  pageSize: number;
  totalCount: number;
  nextPage: () => void;
  prevPage: () => void;
}) => {
  return (
    <div className="flex just_between">
      <button onClick={prevPage} disabled={currentPage === 1}>
        Previous
      </button>
      <span>
        Page {currentPage} of {Math.ceil(totalCount / pageSize)}
      </span>
      <button
        onClick={nextPage}
        disabled={currentPage * pageSize >= totalCount}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
