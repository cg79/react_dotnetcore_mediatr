import { render, fireEvent } from "@testing-library/react";
import UserInformation from "./UserInformation";

describe("UserInformation", () => {
  const user = {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    phoneNumber: "123-456-7890",
  };

  it("renders user information correctly", () => {
    const onEdit = jest.fn();
    const { getByText } = render(
      <UserInformation user={user} onEdit={onEdit} onReload={() => {}} />
    );

    expect(getByText("Name:")).toBeInTheDocument();
    expect(getByText("John Doe")).toBeInTheDocument();
    expect(getByText("Phone:")).toBeInTheDocument();
    expect(getByText("123-456-7890")).toBeInTheDocument();
    expect(getByText("Edit")).toBeInTheDocument();
  });

  it("calls onEdit function when edit button is clicked", () => {
    const onEdit = jest.fn();
    const { getByText } = render(
      <UserInformation user={user} onEdit={onEdit} onReload={() => {}} />
    );
    fireEvent.click(getByText("Edit"));
    expect(onEdit).toHaveBeenCalledWith(user);
  });
});
