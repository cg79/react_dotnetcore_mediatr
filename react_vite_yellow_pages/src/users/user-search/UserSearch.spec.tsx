import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userActions from "../actions/userActions";
import UserSearch from "./UserSearch";

jest.mock("../actions/userActions");

describe("UserSearch", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders UserSearch component", () => {
    const { getByLabelText } = render(<UserSearch />);
    const inputElement = getByLabelText("Search by Phone Number:");
    expect(inputElement).toBeInTheDocument();
  });

  test("triggers search when phone number changes", async () => {
    const searchUserMock = jest.fn();
    userActions.searchUser = jest.fn().mockResolvedValueOnce({
      id: 1,
      firstName: "John",
      lastName: "Doe",
      phoneNumber: "1234567890",
    });
    const { getByLabelText, findByText } = render(<UserSearch />);
    const inputElement = getByLabelText("Search by Phone Number:");

    fireEvent.change(inputElement, { target: { value: "1234567890" } });

    expect(searchUserMock).toHaveBeenCalledTimes(0);

    jest.advanceTimersByTime(500);
    await waitFor(() =>
      expect(userActions.searchUser).toHaveBeenCalledTimes(1)
    );

    // Assert user details are rendered
    expect(await findByText("John")).toBeInTheDocument();
    expect(await findByText("Doe")).toBeInTheDocument();
    expect(await findByText("1234567890")).toBeInTheDocument();
  });

  test("clears user details when no user found", async () => {
    userActions.searchUser = jest.fn().mockResolvedValueOnce(null);
    const { getByLabelText, queryByText } = render(<UserSearch />);
    const inputElement = getByLabelText("Search by Phone Number:");

    fireEvent.change(inputElement, { target: { value: "9876543210" } });

    jest.advanceTimersByTime(500);
    await waitFor(() =>
      expect(userActions.searchUser).toHaveBeenCalledTimes(1)
    );

    // Assert user details are not rendered
    expect(queryByText("John")).not.toBeInTheDocument();
    expect(queryByText("Doe")).not.toBeInTheDocument();
    expect(queryByText("1234567890")).not.toBeInTheDocument();
  });

  test("handles debounce correctly", async () => {
    const debouncedFn = jest.fn();
    const triggerSearchUserMock = jest.fn(() => debouncedFn);
    userActions.searchUser = jest
      .fn()
      .mockImplementation(triggerSearchUserMock);
    const { getByLabelText } = render(<UserSearch />);
    const inputElement = getByLabelText("Search by Phone Number:");

    fireEvent.change(inputElement, { target: { value: "1234567890" } });

    // Fast-forward 250ms
    jest.advanceTimersByTime(250);
    fireEvent.change(inputElement, { target: { value: "9876543210" } });

    // Fast-forward remaining debounce delay
    jest.advanceTimersByTime(250);

    expect(triggerSearchUserMock).toHaveBeenCalledTimes(2);
    expect(debouncedFn).toHaveBeenCalledTimes(1);
  });
});
