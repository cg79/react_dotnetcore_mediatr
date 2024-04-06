import React, { useState } from "react";
import UserType from "../../types/UserType";
import userActions from "../actions/userActions";

const EditUser = ({
  user,
  onUserUpdated,
  onCancel,
}: {
  user: UserType;
  onUserUpdated: (user: UserType) => void;
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

    if (response.error) {
      return setError(response.error);
    }
    onUserUpdated(editedUser);
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
            className="text-input"
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
            className="text-input"
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
            name="phoneNumber"
            type="text"
            className="text-input"
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
