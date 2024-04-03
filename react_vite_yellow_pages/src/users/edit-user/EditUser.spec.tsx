import { act, render, fireEvent } from "@testing-library/react";
import EditUser from "./EditUser";
import UserType from "../../types/UserType";

import userActions from "../actions/userActions";

jest.mock("../actions/userActions");

describe("EditUser component", () => {
  const user: UserType = {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    phoneNumber: "1234567890",
  };

  const onSaveMock = jest.fn();
  const onCancelMock = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders edit user form", () => {
    const { getByLabelText, getByText } = render(
      <EditUser user={user} onSave={onSaveMock} onCancel={onCancelMock} />
    );

    expect(getByLabelText(/First Name:/i)).toBeInTheDocument();
    expect(getByLabelText(/Last Name:/i)).toBeInTheDocument();
    expect(getByLabelText(/Phone Number:/i)).toBeInTheDocument();
    expect(getByText(/Save/i)).toBeInTheDocument();
    expect(getByText(/Cancel/i)).toBeInTheDocument();
  });

  test("handles input change", () => {
    const { getByLabelText } = render(
      <EditUser user={user} onSave={onSaveMock} onCancel={onCancelMock} />
    );

    const firstNameInput = getByLabelText(/First Name:/i) as HTMLInputElement;
    fireEvent.change(firstNameInput, { target: { value: "Jane" } });
    expect(firstNameInput.value).toBe("Jane");

    const lastNameInput = getByLabelText(/Last Name:/i) as HTMLInputElement;
    fireEvent.change(lastNameInput, { target: { value: "Doe" } });
    expect(lastNameInput.value).toBe("Doe");

    const phoneNumberInput = getByLabelText(
      /Phone Number:/i
    ) as HTMLInputElement;
    fireEvent.change(phoneNumberInput, { target: { value: "9876543210" } });
    expect(phoneNumberInput.value).toBe("9876543210");
  });

  test("handles save button click", async () => {
    const onSaveMock1 = jest.fn();
    let called = false;
    userActions.updateUser = jest.fn().mockImplementationOnce(() => {
      called = true;
      return Promise.resolve({ success: true });
    });

    const { getByText } = render(
      <EditUser user={user} onSave={onSaveMock1} onCancel={onCancelMock} />
    );

    fireEvent.click(getByText(/Save/i));

    expect(called).toEqual(true);
    // expect(onSaveMock1).toHaveBeenCalled();
  });

  test("handles cancel button click", () => {
    const { getByText } = render(
      <EditUser user={user} onSave={onSaveMock} onCancel={onCancelMock} />
    );

    fireEvent.click(getByText(/Cancel/i));

    expect(onCancelMock).toHaveBeenCalled();
  });
});
