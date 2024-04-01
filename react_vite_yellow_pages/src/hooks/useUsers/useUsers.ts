import { useState, useEffect } from "react";
import axios from "axios";
import UserType from "../../types/UserType";
import { settings } from "../../settings";
import usePagination from "../usePagination/usePagination";

const useUsers = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { currentPage, pageSize, setTotalCount } = usePagination();

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${settings.SERVER_URL}/api/user/list??pageNumber=${currentPage}pa&pageSize=${pageSize}`
        );
        setUsers(response.data);
        setError(null);
      } catch (error) {
        setError("An error occurred while fetching users.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return { users, loading, error };
};

export default useUsers;
