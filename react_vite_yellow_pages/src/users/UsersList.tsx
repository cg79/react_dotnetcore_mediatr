// import { useState, useEffect } from "react";

import UserType from "src/types/UserType";
import usePagination from "../hooks/usePagination/usePagination";
import useUsers from "../hooks/useUsers/useUsers";

const UsersList = () => {
  const { users } = useUsers();
  const { pageNo, pageCount, changePage } = usePagination();

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
        <button
          onClick={() => changePage(pageNo - 1, false)}
          disabled={pageNo === 1}
        >
          Previous
        </button>
        <span>
          Page {pageNo} of {pageCount}
        </span>
        <button
          onClick={() => changePage(pageNo + 1, false)}
          disabled={pageNo === pageCount}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UsersList;
