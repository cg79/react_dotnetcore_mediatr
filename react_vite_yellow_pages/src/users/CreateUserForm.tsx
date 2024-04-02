import React, { useState } from "react";
import userActions from "./actions";

const CreateUserForm = ({
  onReload,
  onCancel,
}: {
  onReload: () => void;
  onCancel: () => void;
}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    // Validate input
    if (!firstName || !lastName || !phoneNumber) {
      alert("Please fill in all fields");
      return;
    }

    // Save user
    const response = await userActions.createUser({
      firstName,
      lastName,
      phoneNumber,
    });
    if (response.error) {
      return setError(response.error);
    }

    onReload();
  };

  return (
    <div>
      <div className="flex mt5">
        <div>
          <label htmlFor="firstName">First Name:</label>
        </div>
        <div className="ml5">
          <input
            id="firstName"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
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
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
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
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
      </div>

      <div className="flex center mt10">
        <button onClick={handleSave}>Save</button>
        <button onClick={onCancel}>Cancel</button>
      </div>

      {error && <div className="flex center mt10 error">{error}</div>}
    </div>
  );
};

export default CreateUserForm;
