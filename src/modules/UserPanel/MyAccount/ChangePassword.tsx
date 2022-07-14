import styles from "../../../../styles/UserPanel/ChangePassword.module.css";
import Input from "../../../common/input/Input";

function ChangePassword() {
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
            Disabled={true}
          />
        </div>
        <div className={styles.inputContainer}>
          <Input
            Name="newPassword"
            Type="text"
            Label="New password"
            Disabled={true}
          />
        </div>
        <div className={styles.inputContainer}>
          <Input
            Name="retypePassword"
            Type="text"
            Label="Retype new Password"
            Disabled={true}
          />
        </div>
        <button>Save</button>
      </form>
    </div>
  );
}

export default ChangePassword;
