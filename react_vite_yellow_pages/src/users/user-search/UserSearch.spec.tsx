import { render, fireEvent, waitFor } from "@testing-library/react";
import UserSearch from "./UserSearch";
import userActions from "../actions/userActions";

jest.mock("../actions/userActions");

describe("UserSearch Component", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("should render the input field", () => {
    const { getByTestId } = render(<UserSearch />);
    expect(getByTestId("phone-input")).toBeInTheDocument();
  });

  it("should trigger searchUser function on phone number change", () => {
    const { getByTestId } = render(<UserSearch />);
    const inputElement = getByTestId("phone-input");
    fireEvent.change(inputElement, { target: { value: "123456789" } });
    jest.runAllTimers();
    expect(userActions.searchUser).toHaveBeenCalledWith("123456789");
  });

  it("should not trigger searchUser function on rapid phone number changes", () => {
    const { getByTestId } = render(<UserSearch />);
    const inputElement = getByTestId("phone-input");
    fireEvent.change(inputElement, { target: { value: "123" } });
    fireEvent.change(inputElement, { target: { value: "1234" } });
    jest.runAllTimers();
    expect(userActions.searchUser).toHaveBeenCalledTimes(1);
    expect(userActions.searchUser).toHaveBeenCalledWith("1234");
  });

  it("should clear user details when search returns no response or no id", async () => {
    userActions.searchUser = jest.fn().mockResolvedValueOnce(null);
    const { getByTestId, queryByText } = render(<UserSearch />);
    const inputElement = getByTestId("phone-input");
    fireEvent.change(inputElement, { target: { value: "123456789" } });
    await waitFor(() => {
      expect(queryByText("User Details:")).toBeNull();
    });
  });

  it("should display user details when search returns response with id", async () => {
    userActions.searchUser = jest.fn().mockResolvedValueOnce({
      id: 1,
      firstName: "John",
      lastName: "Doe",
      phoneNumber: "123456789",
    });
    const { getByTestId, getByText } = render(<UserSearch />);
    const inputElement = getByTestId("phone-input");
    fireEvent.change(inputElement, { target: { value: "123456789" } });
    await waitFor(() => {
      expect(getByText("User Details:")).toBeInTheDocument();
      expect(getByText("First Name: John")).toBeInTheDocument();
      expect(getByText("Last Name: Doe")).toBeInTheDocument();
      expect(getByText("Phone Number: 123456789")).toBeInTheDocument();
    });
  });

  it("should handle errors when searchUser function throws an error", async () => {
    userActions.searchUser = jest.fn().mockRejectedValueOnce("Error");
    const { getByTestId, getByText } = render(<UserSearch />);
    const inputElement = getByTestId("phone-input");
    fireEvent.change(inputElement, { target: { value: "123456789" } });
    await waitFor(() => {
      expect(getByText("Error searching user")).toBeInTheDocument();
    });
  });
});
