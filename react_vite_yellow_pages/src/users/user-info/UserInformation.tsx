import userActions from "../actions/userActions";
import UserType from "../../types/UserType";

const UserInformation = ({
  user,
  onEdit,
  onReload,
}: {
  user: UserType;
  onEdit: (user: UserType) => void;
  onReload: () => void;
}) => {
  const onDelete = async (user: UserType) => {
    const response = await userActions.deleteUser(user);
    if (response.error) {
      return;
    }
    onReload();
  };
  return (
    <div key={user.id}>
      <div className="flex">
        <span>Name:</span> {user.firstName} {user.lastName}
      </div>
      <div className="flex just_between">
        <div>
          <span>Phone:</span> {user.phoneNumber}
        </div>

        <div className="flex right-align">
          <button className="edit-button" onClick={() => onEdit(user)}>
            Edit
          </button>
        </div>
        <div className="flex right-align">
          <button onClick={() => onDelete(user)}>Delete</button>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default UserInformation;
