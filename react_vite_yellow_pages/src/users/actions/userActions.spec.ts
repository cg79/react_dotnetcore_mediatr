import axios from "axios";
import UserActions from "../actions/userActions";
import { settings } from "../../settings";

// Mock axios
jest.mock("axios");

describe("UserActions", () => {
  describe("getUsers", () => {
    it("should call axios.get with the correct URL", async () => {
      const mockResponse = {
        data: {
          success: true,
          data: [], // Mock data
        },
      };
      (
        axios.get as jest.MockedFunction<typeof axios.get>
      ).mockResolvedValueOnce(mockResponse);

      const result = await UserActions.getUsers(1, 2);

      expect(axios.get).toHaveBeenCalledWith(
        `${settings.SERVER_URL}/api/user/list?pageNumber=1&pageSize=2`
      );
      expect(result).toEqual([]);
    });

    it("should handle error from axios.get", async () => {
      const mockError = new Error("Mock error");
      (
        axios.get as jest.MockedFunction<typeof axios.get>
      ).mockRejectedValueOnce(mockError);

      const result = await UserActions.getUsers(1, 2);

      expect(axios.get).toHaveBeenCalledWith(
        `${settings.SERVER_URL}/api/user/list?pageNumber=1&pageSize=2`
      );
      expect(result).toEqual({ error: undefined });
    });
  });
});
