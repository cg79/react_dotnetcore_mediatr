import { render, fireEvent, waitFor } from "@testing-library/react";
import userActions from "../actions/userActions";
import CreateUser from "./CreateUser";

// Mock the createUser function from userActions
jest.mock("../actions/userActions");

describe("CreateUser", () => {
  test("renders correctly", () => {
    const { getByLabelText, getByText } = render(
      <CreateUser onReload={() => {}} onCancel={() => {}} />
    );

    expect(getByLabelText("First Name:")).toBeInTheDocument();
    expect(getByLabelText("Last Name:")).toBeInTheDocument();
    expect(getByLabelText("Phone Number:")).toBeInTheDocument();
    expect(getByText("Save")).toBeInTheDocument();
    expect(getByText("Cancel")).toBeInTheDocument();
  });

  test("calls createUser function and reloads on successful save", async () => {
    const mockOnReload = jest.fn();
    const { getByText, getByLabelText } = render(
      <CreateUser onReload={mockOnReload} onCancel={() => {}} />
    );

    userActions.createUser = jest.fn().mockResolvedValueOnce({});

    fireEvent.change(getByLabelText("First Name:"), {
      target: { value: "John" },
    });
    fireEvent.change(getByLabelText("Last Name:"), {
      target: { value: "Doe" },
    });
    fireEvent.change(getByLabelText("Phone Number:"), {
      target: { value: "1234567890" },
    });
    fireEvent.click(getByText("Save"));

    await waitFor(() => {
      expect(userActions.createUser).toHaveBeenCalledWith({
        firstName: "John",
        lastName: "Doe",
        phoneNumber: "1234567890",
      });
      expect(mockOnReload).toHaveBeenCalled();
    });
  });

  test("displays error message on unsuccessful save", async () => {
    const mockOnCancel = jest.fn();
    const { getByText, getByLabelText, findByText } = render(
      <CreateUser onReload={() => {}} onCancel={mockOnCancel} />
    );

    userActions.createUser = jest.fn().mockResolvedValueOnce({
      error: "Failed to create user",
    });

    fireEvent.change(getByLabelText("First Name:"), {
      target: { value: "John" },
    });
    fireEvent.change(getByLabelText("Last Name:"), {
      target: { value: "Doe" },
    });
    fireEvent.change(getByLabelText("Phone Number:"), {
      target: { value: "1234567890" },
    });
    fireEvent.click(getByText("Save"));

    const errorMessage = await findByText("Failed to create user");
    expect(errorMessage).toBeInTheDocument();
    expect(mockOnCancel).not.toHaveBeenCalled();
  });
});
