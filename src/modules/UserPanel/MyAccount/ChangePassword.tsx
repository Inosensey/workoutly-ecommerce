import { useState } from "react";
import styles from "../../../../styles/UserPanel/ChangePassword.module.css";
import Input from "../../../common/input/Input";

const DefaultPasswordDetails = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};

function ChangePassword() {
  const [passwordDetails, setPasswordDetails] = useState(
    DefaultPasswordDetails
  );

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <h3>Change Password</h3>
        <p>Manage your password to secure your account</p>
      </div>
      <form className={styles.formControl}>
        <div className={styles.inputContainer}>
          <Input
            Name="oldPassword"
            Type="text"
            Label="Password"
            inputValue={passwordDetails.oldPassword}
            setInputValue={(e: any) =>
              setPasswordDetails({
                ...passwordDetails,
                oldPassword: e.target.value,
              })
            }
            enableValidation={false}
            Notification={""}
            Valid={null}
            Disabled={true}
          />
        </div>
        <div className={styles.inputContainer}>
          <Input
            Name="newPassword"
            Type="text"
            Label="New password"
            inputValue={passwordDetails.newPassword}
            setInputValue={(e: any) =>
              setPasswordDetails({
                ...passwordDetails,
                newPassword: e.target.value,
              })
            }
            enableValidation={false}
            Notification={""}
            Valid={null}
            Disabled={true}
          />
        </div>
        <div className={styles.inputContainer}>
          <Input
            Name="confirmPassowrd"
            Type="text"
            Label="Confirm new Password"
            inputValue={passwordDetails.confirmPassword}
            setInputValue={(e: any) =>
              setPasswordDetails({
                ...passwordDetails,
                confirmPassword: e.target.value,
              })
            }
            enableValidation={false}
            Notification={""}
            Valid={null}
            Disabled={true}
          />
        </div>
        <button>Save</button>
      </form>
    </div>
  );
}

export default ChangePassword;
