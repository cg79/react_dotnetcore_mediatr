import axios, { AxiosError } from "axios";
import { settings } from "../settings";
import UserType from "src/types/UserType";

class UserActions {
  updateUser = async (user: UserType) => {
    try {
      // eslint-disable-next-line no-debugger
      debugger;
      const response = await axios.put(
        `${settings.SERVER_URL}/api/user/${user.id}`,
        user
      );
      return response.data;
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
      return response.data;
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
      return response.data;
    } catch (error: AxiosError | unknown) {
      return this.processAxiosError(error);
    }
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
