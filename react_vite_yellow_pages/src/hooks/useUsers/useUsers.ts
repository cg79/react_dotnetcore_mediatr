// useUsers.js
import { useEffect, useState } from "react";
import UserType from "../../types/UserType";
import userActions from "../../users/actions/userActions";

const useUsers = (currentPage = 1, pageSize = 2) => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reload, setReload] = useState<string>("");

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await userActions.getUsers(currentPage, pageSize);
        setUsers(response.users);
        setTotalCount(response.totalCount);
        setError(null);
      } catch (error) {
        setError("An error occurred while fetching users.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [currentPage, pageSize, reload]);

  return { users, totalCount, loading, error, setReload };
};

export default useUsers;
