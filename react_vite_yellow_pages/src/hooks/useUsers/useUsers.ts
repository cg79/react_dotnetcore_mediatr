// useUsers.js
import { useEffect, useState } from "react";
import axios from "axios";
import UserType from "../../types/UserType";
import { settings } from "../../settings";

const useUsers = (currentPage: number, pageSize: number) => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${settings.SERVER_URL}/api/user/list?pageNumber=${currentPage}&pageSize=${pageSize}`
        );
        setUsers(response.data.users);
        setTotalCount(response.data.totalCount);
        setError(null);
      } catch (error) {
        setError("An error occurred while fetching users.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [currentPage, pageSize]);

  return { users, totalCount, loading, error };
};

export default useUsers;
