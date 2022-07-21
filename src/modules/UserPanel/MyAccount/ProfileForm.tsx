import { useState } from "react";
import { useRef } from "react";
import styles from "../../../../styles/UserPanel/ProfileForm.module.css";
import Input from "../../../common/input/Input";

const DefaultPersonalDetails = {
  firstName: "",
  middleName: "",
  lastName: "",
  birthDate: "",
  gender: "",
};

function ProfileForm() {
  const inputRef = useRef<HTMLDivElement>(null);
  const [personalDetails, setPersonalDetails] = useState(
    DefaultPersonalDetails
  );
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <h3>My Profile</h3>
        <p>Manage and secure your account</p>
      </div>
      <form className={styles.formControl}>
        <div className={styles.inputContainer} ref={inputRef}>
          <Input
            Name="firstName"
            Type="text"
            Label="First name"
            inputValue={personalDetails.firstName}
            setInputValue={(e: any) =>
              setPersonalDetails({
                ...personalDetails,
                firstName: e.target.value,
              })
            }
            enableValidation={false}
            Notification={""}
            Valid={null}
            Disabled={isEditing ? false : true}
          />
        </div>
        <div className={styles.inputContainer}>
          <Input
            Name="middleName"
            Type="text"
            Label="Middle name"
            inputValue={personalDetails.middleName}
            setInputValue={(e: any) =>
              setPersonalDetails({
                ...personalDetails,
                middleName: e.target.value,
              })
            }
            enableValidation={false}
            Notification={""}
            Valid={null}
            Disabled={isEditing ? false : true}
          />
        </div>
        <div className={styles.inputContainer}>
          <Input
            Name="lastName"
            Type="text"
            Label="Last name"
            inputValue={personalDetails.lastName}
            setInputValue={(e: any) =>
              setPersonalDetails({
                ...personalDetails,
                lastName: e.target.value,
              })
            }
            enableValidation={false}
            Notification={""}
            Valid={null}
            Disabled={isEditing ? false : true}
          />
        </div>
        <div className={styles.inputContainer}>
          <Input
            Name="birthDate"
            Type="date"
            Label="Birth date"
            inputValue={personalDetails.birthDate}
            setInputValue={(e: any) =>
              setPersonalDetails({
                ...personalDetails,
                birthDate: e.target.value,
              })
            }
            enableValidation={false}
            Notification={""}
            Valid={null}
            Disabled={isEditing ? false : true}
          />
        </div>
        <div className={styles.inputContainer}>
          <Input
            Name="gender"
            Type="text"
            Label="Gender"
            inputValue={personalDetails.gender}
            setInputValue={(e: any) =>
              setPersonalDetails({ ...personalDetails, gender: e.target.value })
            }
            enableValidation={false}
            Notification={""}
            Valid={null}
            Disabled={isEditing ? false : true}
          />
        </div>
        <div className={styles.buttonsContainer}>
          {isEditing ? (
            <>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsEditing(false);
                }}
                className={styles.cancel}
              >
                Cancel
              </button>
              <button className={styles.save}>Save</button>
            </>
          ) : (
            <button
              className={styles.edit}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                inputRef.current!.scrollIntoView({ behavior: "smooth" });
                setIsEditing(true);
              }}
            >
              Edit
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default ProfileForm;
