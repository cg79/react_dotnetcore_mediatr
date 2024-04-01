import { act, renderHook } from "@testing-library/react";

import usePagination from "./usePagination";

describe("usePagination", () => {
  it("should render currentPage, pageCount", () => {
    const { result } = renderHook(() =>
      usePagination({ totalCount: 100, pageSize: 15, page: 1 })
    );
    const { pageNo: currentPage, pageCount } = result.current;

    expect(currentPage).toEqual(1);
    expect(pageCount).toEqual(7);
  });

  describe("when not loading", () => {
    it.each([[0], [1], [2], [3], [4], [5]])(
      "should render next page (%s)",
      (page: number) => {
        const { result } = renderHook(() =>
          usePagination({ totalCount: 100, pageSize: 15, page })
        );
        const { nextPage } = result.current;

        act(() => nextPage(false));

        const { pageNo: currentPage } = result.current;
        expect(currentPage).toEqual(page + 1);
      }
    );

    it.each([[1], [2], [3], [4], [5], [6]])(
      "should render previous page (%s)",
      (page: number) => {
        const { result } = renderHook(() =>
          usePagination({ totalCount: 100, pageSize: 15, page })
        );
        const { previousPage } = result.current;

        act(() => previousPage(false));

        const { pageNo: currentPage } = result.current;
        expect(currentPage).toEqual(page - 1);
      }
    );

    it("should render defined currentPage", () => {
      const { result } = renderHook(() =>
        usePagination({ totalCount: 100, pageSize: 15, page: 1 })
      );
      const { changePage } = result.current;

      act(() => changePage(5, false));

      const { pageNo: currentPage } = result.current;
      expect(currentPage).toEqual(5);
    });

    it.each([[-1], [10]])("should not render new page", (newPage: number) => {
      const { result } = renderHook(() =>
        usePagination({ totalCount: 100, pageSize: 15, page: 1 })
      );
      const { changePage } = result.current;

      act(() => changePage(newPage, false));

      const { pageNo: currentPage } = result.current;
      expect(currentPage).toEqual(1);
    });
  });

  describe("when loading", () => {
    it("should not render on previous page request", () => {
      const { result } = renderHook(() =>
        usePagination({ totalCount: 100, pageSize: 15, page: 1 })
      );
      const { previousPage } = result.current;

      act(() => previousPage(true));

      const { pageNo: currentPage } = result.current;
      expect(currentPage).toEqual(1);
    });

    it("should not render on next page request", () => {
      const { result } = renderHook(() =>
        usePagination({ totalCount: 100, pageSize: 15, page: 1 })
      );
      const { nextPage } = result.current;

      act(() => nextPage(true));

      const { pageNo: currentPage } = result.current;
      expect(currentPage).toEqual(1);
    });

    it("should not render on change page request", () => {
      const { result } = renderHook(() =>
        usePagination({ totalCount: 100, pageSize: 15, page: 1 })
      );
      const { changePage } = result.current;

      act(() => changePage(5, true));

      const { pageNo: currentPage } = result.current;
      expect(currentPage).toEqual(1);
    });
  });
});
