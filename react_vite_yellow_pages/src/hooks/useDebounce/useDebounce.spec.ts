import { renderHook } from "@testing-library/react";
import useDebounce from "./useDebounce";

describe("useDebounce", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("should debounce the function call", () => {
    const mockFunction = jest.fn();
    const delay = 500;
    const { result } = renderHook(() => useDebounce(mockFunction, delay));
    const debouncedFunction = result.current;

    debouncedFunction();
    expect(mockFunction).not.toHaveBeenCalled();

    jest.advanceTimersByTime(delay - 1);
    expect(mockFunction).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1);
    expect(mockFunction).toHaveBeenCalled();
    expect(mockFunction).toHaveBeenCalledTimes(1);
  });

  it("should debounce multiple function calls", () => {
    const mockFunction = jest.fn();
    const delay = 500;
    const { result } = renderHook(() => useDebounce(mockFunction, delay));
    const debouncedFunction = result.current;

    // Trigger multiple function calls
    debouncedFunction();
    debouncedFunction();
    debouncedFunction();

    expect(mockFunction).not.toHaveBeenCalled();

    jest.advanceTimersByTime(delay);

    expect(mockFunction).toHaveBeenCalled();
  });

  it("should clear previous timer when called multiple times", () => {
    const mockFunction = jest.fn();
    const delay = 500;
    const { result } = renderHook(() => useDebounce(mockFunction, delay));
    const debouncedFunction = result.current;

    debouncedFunction();
    jest.advanceTimersByTime(delay - 200);
    debouncedFunction();
    jest.advanceTimersByTime(199);
    debouncedFunction();
    jest.advanceTimersByTime(1);

    jest.advanceTimersByTime(delay);

    expect(mockFunction).toHaveBeenCalled();
  });
});
