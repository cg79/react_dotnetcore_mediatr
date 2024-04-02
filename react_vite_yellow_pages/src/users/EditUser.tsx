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
    setError(null);
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
      <div className="flex mt5">
        <div>
          <label htmlFor="firstName">First Name:</label>
        </div>
        <div className="ml5">
          <input
            id="firstName"
            name="firstName"
            type="text"
            value={editedUser.firstName}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="flex mt5">
        <div>
          <label htmlFor="lastName">Last Name:</label>
        </div>
        <div className="ml5">
          <input
            id="lastName"
            name="lastName"
            type="text"
            value={editedUser.lastName}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="flex mt5">
        <div>
          <label htmlFor="phoneNumber">Phone Number:</label>
        </div>
        <div className="ml5">
          <input
            id="phoneNumber"
            type="text"
            value={editedUser.phoneNumber}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="flex space_evenly mt10">
        <button onClick={handleSave}>Save</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
      <>{error && <div className="error">{error}</div>}</>
    </>
  );
};

export default EditUser;
