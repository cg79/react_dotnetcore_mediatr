import React, { useState } from "react";
import UserType from "../types/UserType";
import userActions from "./actions";

const EditUser = ({
  user,
  onSave,
  onCancel,
}: {
  user: UserType;
  onSave: (user: UserType) => void;
  onCancel: () => void;
}) => {
  const [editedUser, setEditedUser] = useState(user);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    const response = await userActions.updateUser(editedUser);
    // eslint-disable-next-line no-debugger
    debugger;
    if (response.error) {
      setError(response.error);
      return;
    }
    onSave(editedUser);
  };

  return (
    <>
      <div>
        <input
          type="text"
          name="firstName"
          value={editedUser.firstName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="lastName"
          value={editedUser.lastName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="phoneNumber"
          value={editedUser.phoneNumber}
          onChange={handleChange}
        />
        <button onClick={handleSave}>Save</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
      <>{error && <div>{error}</div>}</>
    </>
  );
};

export default EditUser;
