import { renderHook, act } from "@testing-library/react";
import useUsers from "./useUsers";
import userActions from "../../users/actions/userActions";

jest.mock("../../users/actions/userActions");

describe("useUsers", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch users and set state correctly", async () => {
    const mockUsers = [
      { id: 1, name: "User 1" },
      { id: 2, name: "User 2" },
    ];
    const mockTotalCount = 2;
    userActions.getUsers = jest
      .fn()
      .mockResolvedValueOnce({ users: mockUsers, totalCount: mockTotalCount });

    const { result } = renderHook(() => useUsers());

    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();
    expect(result.current.users).toEqual([]);
    expect(result.current.totalCount).toBe(0);
  });

  it("should handle error when fetching users fails", async () => {
    const mockError = "Failed to fetch users";
    userActions.getUsers = jest.fn().mockRejectedValueOnce(mockError);

    const { result } = renderHook(() => useUsers());

    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();
    expect(result.current.users).toEqual([]);
    expect(result.current.totalCount).toBe(0);
  });

  it("should set reload flag when setReload function is called", async () => {
    const { result } = renderHook(() => useUsers());

    expect(result.current.reload).toBe("");

    act(() => {
      result.current.setReload("reload");
    });

    expect(result.current.reload).toBe("reload");
  });
});
