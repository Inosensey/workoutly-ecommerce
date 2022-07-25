import { useEffect, useState } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../../../styles/UserPanel/ProfileForm.module.css";
import Input from "../../../common/input/Input";
import { toggleLoadingPopUp } from "../../../Redux/Reducers/PopUpLoading";
import { RootState } from "../../../Redux/store";
import getPersonalDetails from "../../../Services/Supabase/getPersonalDetails";
import { supabase } from "../../../Services/Supabase/supabaseClient";
import updatePersonalDetails from "../../../Services/Supabase/updatePersonalDetails";

const DefaultDetails = {
  id: "",
  firstName: "",
  middleName: "",
  lastName: "",
  birthDate: "",
  gender: "",
};

function ProfileForm() {
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLDivElement>(null);
  const Session: any =
    useSelector((state: RootState) => state.AuthReducer.Session) || {};
  const [details, setDetails] = useState(DefaultDetails);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    personalDetails();
  }, []);
  const personalDetails = async () => {
    supabase.auth.setAuth(Session.Auth.access_token);
    const response: any = await getPersonalDetails(Session.User.id);
    if (response.Data === null) return;
    setDetails({
      ...details,
      firstName: response.Data[0].first_name,
      middleName: response.Data[0].middle_name,
      lastName: response.Data[0].last_name,
      birthDate: response.Data[0].birth_date,
      gender: response.Data[0].gender,
    });
  };
  const updatePersonalDetailsHandler = async () => {
    dispatch(
      toggleLoadingPopUp({
        ActionName: "Updating",
        LoadingMessage: "Please wait while we update your account",
        isLoading: true,
      })
    );
    const response = await updatePersonalDetails(details, Session.User.id);
    dispatch(
      toggleLoadingPopUp({
        ActionName: "",
        LoadingMessage: "",
        isLoading: false,
      })
    );
    if (response?.data !== null) {
      personalDetails();
      inputRef.current!.scrollIntoView({ behavior: "smooth" });
      setIsEditing(false);
    }
  };

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
            inputValue={details.firstName}
            setInputValue={(e: any) =>
              setDetails({
                ...details,
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
            inputValue={details.middleName}
            setInputValue={(e: any) =>
              setDetails({
                ...details,
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
            inputValue={details.lastName}
            setInputValue={(e: any) =>
              setDetails({
                ...details,
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
            inputValue={details.birthDate}
            setInputValue={(e: any) =>
              setDetails({
                ...details,
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
            inputValue={details.gender}
            setInputValue={(e: any) =>
              setDetails({ ...details, gender: e.target.value })
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
                  inputRef.current!.scrollIntoView({ behavior: "smooth" });
                  setIsEditing(false);
                }}
                className={styles.cancel}
              >
                Cancel
              </button>
              <button
                className={styles.save}
                onClick={async (e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  updatePersonalDetailsHandler();
                }}
              >
                Save
              </button>
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
