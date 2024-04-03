import axios, { AxiosError } from "axios";
import { settings } from "../../settings";
import UserType from "src/types/UserType";

class UserActions {
  getUsers = async (currentPage = 1, pageSize = 2) => {
    try {
      // eslint-disable-next-line no-debugger
      debugger;
      const response = await axios.get(
        `${settings.SERVER_URL}/api/user/list?pageNumber=${currentPage}&pageSize=${pageSize}`
      );
      return this.processAxiosResponse(response);
    } catch (error: AxiosError | unknown) {
      return this.processAxiosError(error);
    }
  };
  updateUser = async (user: UserType) => {
    try {
      // eslint-disable-next-line no-debugger
      debugger;
      const response = await axios.put(
        `${settings.SERVER_URL}/api/user/${user.id}`,
        user
      );
      return this.processAxiosResponse(response);
    } catch (error: AxiosError | unknown) {
      return this.processAxiosError(error);
    }
  };

  deleteUser = async (user: UserType) => {
    try {
      // eslint-disable-next-line no-debugger
      debugger;
      const response = await axios.delete(
        `${settings.SERVER_URL}/api/user/id/${user.id}`
      );
      return this.processAxiosResponse(response);
    } catch (error: AxiosError | unknown) {
      return this.processAxiosError(error);
    }
  };

  createUser = async (user: UserType | Omit<UserType, "id">) => {
    try {
      // eslint-disable-next-line no-debugger
      debugger;
      const response = await axios.post(
        `${settings.SERVER_URL}/api/user`,
        user
      );
      return this.processAxiosResponse(response);
    } catch (error: AxiosError | unknown) {
      return this.processAxiosError(error);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  processAxiosResponse = (response: any) => {
    const { data } = response;
    if (data.success) {
      return data.data || {};
    }
    return data;
  };

  processAxiosError = (error: AxiosError | unknown) => {
    // eslint-disable-next-line no-debugger
    debugger;
    const axiosError = error as AxiosError;
    if (!axiosError) {
      return {
        error: "unknown",
      };
    }
    // eslint-disable-next-line no-debugger
    debugger;
    console.error("Error updating user:", error);
    return {
      error: axiosError.response?.data,
    };
  };
}

export default new UserActions();
