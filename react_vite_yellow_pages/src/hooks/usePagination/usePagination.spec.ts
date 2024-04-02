import { renderHook, act } from "@testing-library/react";
import usePagination from "./usePagination";

describe("usePagination", () => {
  it("should initialize with default values", () => {
    const { result } = renderHook(() => usePagination());

    expect(result.current.currentPage).toBe(1);
    expect(result.current.pageSize).toBe(2);
  });

  it("should initialize with custom values", () => {
    const { result } = renderHook(() => usePagination(3, 5));

    expect(result.current.currentPage).toBe(3);
    expect(result.current.pageSize).toBe(5);
  });

  it("should increment currentPage on nextPage", () => {
    const { result } = renderHook(() => usePagination());

    act(() => {
      result.current.nextPage();
    });

    expect(result.current.currentPage).toBe(2);
  });

  it("should decrement currentPage on prevPage", () => {
    const { result } = renderHook(() => usePagination(2));

    act(() => {
      result.current.prevPage();
    });

    expect(result.current.currentPage).toBe(1);
  });

  it("should not decrement currentPage below 1 on prevPage", () => {
    const { result } = renderHook(() => usePagination());

    act(() => {
      result.current.prevPage();
    });

    expect(result.current.currentPage).toBe(1);
  });

  it("should set currentPage", () => {
    const { result } = renderHook(() => usePagination());

    act(() => {
      result.current.setCurrentPage(3);
    });

    expect(result.current.currentPage).toBe(3);
  });

  it("should set pageSize", () => {
    const { result } = renderHook(() => usePagination());

    act(() => {
      result.current.setPageSize(10);
    });

    expect(result.current.pageSize).toBe(10);
  });
});
