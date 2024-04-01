import { useState, useEffect } from "react";
import axios from "axios";
import UserType from "../../types/UserType";
import { settings } from "../../settings";
import usePagination from "../usePagination/usePagination";

const useUsers = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { pageNo, pageSize, setTotalCount } = usePagination();

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${settings.SERVER_URL}/api/user/list?pageNumber=${pageNo}&pageSize=${pageSize}`
        );
        setUsers(response.data.users);
        setTotalCount(response.data.totalCount);
        console.log("esponse.data.totalCount", response.data.totalCount);
        setError(null);
      } catch (error) {
        setError("An error occurred while fetching users.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [pageNo, pageSize, setTotalCount]);

  return { users, loading, error };
};

export default useUsers;
