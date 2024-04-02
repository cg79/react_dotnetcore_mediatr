// import { useState, useEffect } from "react";

import UserType from "src/types/UserType";
import usePagination from "../hooks/usePagination/usePagination";
import useUsers from "../hooks/useUsers/useUsers";
import UserInformation from "./UserInformation";
import { useState } from "react";
import Pagination from "../components/pagination/Pagination";
import EditUser from "./EditUser";
import CreateUserForm from "./CreateUserForm";

const UsersList = () => {
  const [editedUser, setEditedUser] = useState<UserType | null>(null);
  const [creationMode, setCreationMode] = useState(false);
  const { currentPage, pageSize, nextPage, prevPage } = usePagination();
  const { users, totalCount, loading, error, setReload } = useUsers(
    currentPage,
    pageSize
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const onEdit = (user: UserType) => {
    setEditedUser(user);
  };

  const onUserUpdated = async () => {
    setEditedUser(null);
    setReload(new Date().toString());
  };
  return (
    <div>
      <h2>User List</h2>
      <div>
        {users.map((user) =>
          editedUser && editedUser.id === user.id ? (
            <EditUser
              key={user.id}
              user={user}
              onSave={onUserUpdated}
              onCancel={() => setEditedUser(null)}
            />
          ) : (
            <UserInformation
              key={user.id}
              user={user}
              onEdit={onEdit}
              onReload={() => setReload(new Date().toString())}
            />
          )
        )}
      </div>
      {totalCount > 0 && (
        <Pagination
          currentPage={currentPage}
          pageSize={pageSize}
          totalCount={totalCount}
          nextPage={nextPage}
          prevPage={prevPage}
        />
      )}

      {!creationMode && (
        <div className="mt10">
          <button onClick={() => setCreationMode(true)}>New User</button>
        </div>
      )}

      {creationMode && (
        <CreateUserForm
          onReload={() => {
            setCreationMode(false);
            setReload(new Date().toString());
          }}
          onCancel={() => setCreationMode(false)}
        ></CreateUserForm>
      )}
    </div>
  );
};

export default UsersList;