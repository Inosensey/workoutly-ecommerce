import styles from "../../../../styles/UserPanel/ProfileForm.module.css";
import Input from "../../../common/input/Input";

function ProfileForm() {
  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <h3>My Profile</h3>
        <p>Manage and secure your account</p>
      </div>
      <form className={styles.formControl}>
        <div className={styles.inputContainer}>
          <Input
            Name="firstName"
            Type="text"
            Label="First name"
            Disabled={true}
          />
        </div>
        <div className={styles.inputContainer}>
          <Input
            Name="middleName"
            Type="text"
            Label="Middle name"
            Disabled={true}
          />
        </div>
        <div className={styles.inputContainer}>
          <Input
            Name="lastName"
            Type="text"
            Label="Last name"
            Disabled={true}
          />
        </div>
        <div className={styles.inputContainer}>
          <Input
            Name="birthDate"
            Type="date"
            Label="Birth date"
            Disabled={true}
          />
        </div>
        <div className={styles.inputContainer}>
          <Input Name="gender" Type="text" Label="Gender" Disabled={true} />
        </div>
        <button>Save</button>
      </form>
    </div>
  );
}

export default ProfileForm;
