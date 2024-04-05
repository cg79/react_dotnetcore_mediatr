import axios from "axios";
import UserActions from "./userActions";
import UserType from "src/types/UserType";

jest.mock("axios");

describe("UserActions", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockUser: UserType = {
    id: 1,
    firstName: "Test User",
    lastName: "test@example.com",
    phoneNumber: "1234567890",
  };

  it("should fetch users successfully", async () => {
    const mockResponse = {
      data: {
        success: true,
        data: [mockUser],
      },
    };
    axios.get = jest.fn().mockResolvedValue(mockResponse);

    const result = await UserActions.getUsers();

    expect(result).toEqual([mockUser]);
  });

  it("should handle error when fetching users fails", async () => {
    const errorMessage = "Failed to fetch users";

    axios.get = jest
      .fn()
      .mockRejectedValueOnce({ response: { data: errorMessage } });

    const result = await UserActions.getUsers();

    expect(result).toEqual({ error: errorMessage });
  });

  it("should update user successfully", async () => {
    const mockResponse = {
      data: {
        success: true,
        data: { x: 1 },
      },
    };
    axios.put = jest.fn().mockResolvedValue(mockResponse);

    const result = await UserActions.updateUser(mockUser);

    expect(result).toEqual({ x: 1 });
  });

  it("should handle error when updating user fails", async () => {
    const errorMessage = "Failed to update user";
    axios.put = jest
      .fn()
      .mockRejectedValueOnce({ response: { data: errorMessage } });

    const result = await UserActions.updateUser(mockUser);

    expect(result).toEqual({ error: errorMessage });
  });

  it("should delete user successfully", async () => {
    const mockResponse = {
      data: {
        success: true,
      },
    };
    axios.delete = jest.fn().mockResolvedValue(mockResponse);

    const result = await UserActions.deleteUser(mockUser);

    expect(result).toEqual({});
  });

  it("should handle error when deleting user fails", async () => {
    const errorMessage = "Failed to delete user";
    axios.delete = jest
      .fn()
      .mockRejectedValueOnce({ response: { data: errorMessage } });

    const result = await UserActions.deleteUser(mockUser);

    expect(result).toEqual({ error: errorMessage });
  });

  it("should create user successfully", async () => {
    const mockResponse = {
      data: {
        success: true,
      },
    };
    axios.post = jest.fn().mockResolvedValue(mockResponse);

    const result = await UserActions.createUser(mockUser);

    expect(result).toEqual({});
  });

  it("should handle error when creating user fails", async () => {
    const errorMessage = "Failed to create user";
    axios.post = jest
      .fn()
      .mockRejectedValueOnce({ response: { data: errorMessage } });

    const result = await UserActions.createUser(mockUser);

    expect(result).toEqual({ error: errorMessage });
  });

  it("should search user successfully", async () => {
    const mockPhoneNumber = "123456789";
    const mockResponse = {
      data: {
        success: true,
        data: mockUser,
      },
    };
    axios.get = jest.fn().mockResolvedValue(mockResponse);

    const result = await UserActions.searchUser(mockPhoneNumber);

    expect(result).toEqual(mockUser);
  });

  it("should handle error when searching user fails", async () => {
    const mockPhoneNumber = "123456789";
    const errorMessage = "Failed to search user";
    axios.get = jest
      .fn()
      .mockRejectedValueOnce({ response: { data: errorMessage } });

    const result = await UserActions.searchUser(mockPhoneNumber);

    expect(result).toEqual({ error: errorMessage });
  });
});
