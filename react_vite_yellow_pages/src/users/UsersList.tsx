// import { useState, useEffect } from "react";

import UserType from "src/types/UserType";
import usePagination from "../hooks/usePagination/usePagination";
import useUsers from "../hooks/useUsers/useUsers";

const UsersList = () => {
  const { currentPage, pageSize, nextPage, prevPage } = usePagination();
  const { users, totalCount, loading, error } = useUsers(currentPage, pageSize);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const onEdit = (user: UserType) => {
    console.log(user);
  };
  return (
    <div>
      <h2>User List</h2>
      <div>
        {users.map((user) => (
          <div key={user.id}>
            <div className="flex">
              <span>Name:</span> {user.firstName} {user.lastName}
            </div>
            <div className="flex just_between">
              <div>
                <span>Phone:</span> {user.phoneNumber}
              </div>

              <div className="flex right-align">
                <button onClick={() => onEdit(user)}>Edit</button>
              </div>
            </div>
            <hr></hr>
          </div>
        ))}
      </div>
      <div>
        <button onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {Math.floor(totalCount / pageSize)}
        </span>
        <button
          onClick={nextPage}
          disabled={currentPage * pageSize >= totalCount}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UsersList;
