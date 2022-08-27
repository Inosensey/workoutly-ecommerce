import { useState } from "react";
import styles from "../../../../styles/UserPanel/ChangePassword.module.css";
import Input from "../../../common/input/Input";
import { supabase } from "../../../Services/Supabase/supabaseClient";

const DefaultPasswordDetails = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};

interface PasswordDetailsInterface {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

function ChangePassword() {
  const [passwordDetails, setPasswordDetails] =
    useState<PasswordDetailsInterface>(DefaultPasswordDetails);
  const session = supabase.auth.session();
  console.log(session);

  const ResetPasswordHandler = async () => {
    try {
      const { data, error } = await supabase.auth.api.resetPasswordForEmail(
        "dingcong.bae@gmail.com"
      );
      console.log(data);
      console.log(error);
    } catch (error) {
      console.log({ Error: error });
    }
  };

  return (
    <div className={styles.container}>
      <button
        onClick={() => {
          ResetPasswordHandler();
        }}
      >
        reset
      </button>
      <div className={styles.headerContainer}>
        <h3>Change Password</h3>
        <p>Manage your password to secure your account</p>
      </div>
      <form className={styles.formControl}>
        <div className={styles.inputContainer}>
          <Input
            Name="oldPassword"
            Type="text"
            Label="Old Password"
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
            Disabled={false}
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
            Disabled={false}
          />
        </div>
        <div className={styles.inputContainer}>
          <Input
            Name="confirmPassword"
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
            Disabled={false}
          />
        </div>
        <button>Save</button>
      </form>
    </div>
  );
}

export default ChangePassword;
