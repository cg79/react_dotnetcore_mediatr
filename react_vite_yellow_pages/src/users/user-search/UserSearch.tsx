import { useState } from "react";
// import { debounce, throttle } from "lodash";
import UserType from "src/types/UserType";
import userActions from "../actions/userActions";
import useDebounce from "../../hooks/useDebounce/useDebounce";

const UserSearch = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [user, setUser] = useState<UserType | null>(null);

  const triggerSearchUser = async (phoneNumber: string) => {
    try {
      const response = await userActions.searchUser(phoneNumber);
      if (!response || !response.id) {
        return setUser(null);
      }
      setUser(response);
    } catch (error) {
      console.error("Error searching user:", error);
    }
  };

  // Debounce the search function
  const debouncedSearch = useDebounce(triggerSearchUser, 500);

  const handlePhoneNumberChange = (e) => {
    const phoneNumber = e.target.value;
    setPhoneNumber(phoneNumber);
    debouncedSearch(phoneNumber);
  };

  return (
    <div>
      <label htmlFor="phoneNumber">Search by Phone Number:</label>
      <input
        id="phoneNumber"
        type="text"
        className="text-input"
        value={phoneNumber}
        onChange={handlePhoneNumberChange}
      />
      {user && (
        <div>
          <h2>User Details:</h2>
          <p>First Name: {user.firstName}</p>
          <p>Last Name: {user.lastName}</p>
          <p>Phone Number: {user.phoneNumber}</p>
        </div>
      )}
    </div>
  );
};

export default UserSearch;
