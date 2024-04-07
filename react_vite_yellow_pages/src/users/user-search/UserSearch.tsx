import { useState } from "react";
// import { debounce, throttle } from "lodash";
import UserType from "src/types/UserType";
import userActions from "../actions/userActions";
import useDebounce from "../../hooks/useDebounce/useDebounce";

const UserSearch = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [user, setUser] = useState<UserType | null>(null);
  const [error, setError] = useState<string | null>(null);

  const triggerSearchUser = async (phoneNumber: string) => {
    try {
      setError(null);
      const response = await userActions.searchUser(phoneNumber);
      // eslint-disable-next-line no-debugger
      debugger;
      if (!response || !response.id) {
        return setUser(null);
      }
      setUser(response);
    } catch (error) {
      setError("Error searching user");
    }
  };

  // Debounce the search function
  const debouncedSearch = useDebounce(triggerSearchUser, 500);

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const phoneNumber = e.target.value;
    setPhoneNumber(phoneNumber);
    debouncedSearch(phoneNumber);
  };

  return (
    <div>
      <label htmlFor="phoneNumber">Search by Phone Number:</label>
      <input
        id="phoneNumberSearch"
        type="text"
        className="text-input"
        value={phoneNumber}
        onChange={handlePhoneNumberChange}
        data-testid="phone-input"
      />
      {error && <p>{error}</p>}
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
