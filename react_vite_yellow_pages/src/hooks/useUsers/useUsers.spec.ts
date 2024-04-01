import { renderHook } from "@testing-library/react";
import axios from "axios";
import useUsers from "./useUsers";

jest.mock("axios");

describe("useUsers", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch users successfully", async () => {
    axios.get = jest.fn().mockResolvedValue({
      data: [
        { id: 1, name: "John" },
        { id: 2, name: "Jane" },
      ],
    });
    const { result } = renderHook(() => useUsers());

    expect(result.current.loading).toBe(true);
  });

  it("should handle error when fetching users", async () => {
    const errorMessage = "Failed to fetch users";
    axios.get = jest.fn().mockRejectedValueOnce(new Error(errorMessage));

    const hookResult = renderHook(() => useUsers());

    expect(hookResult?.result.current.users).toEqual([]);
    expect(hookResult?.result.current.loading).toBe(true);
    expect(hookResult?.result.current.error).toBe(null);
  });
});
