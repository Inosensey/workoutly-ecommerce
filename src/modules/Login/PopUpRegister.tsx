import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  showLoadingPopUp,
  hideLoadingPopUp,
} from "../../Redux/Reducers/PopUpLoading";

import Input from "../../common/input/Input";
import styles from "../../../styles/PopLogin/PopUpRegister.module.css";
import useInputValidation from "../../Hooks/useInputValidation";
import addUser from "../../Services/Supabase/addUser";
import { supabase } from "../../Services/Supabase/supabaseClient";
import { showNotifPopUp } from "../../Redux/Reducers/PopUpNotif";

// Framer Motion Variants
const DropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

const DefaultUserDetails = {
  username: "",
  email: "",
  password: "",
};
const DefaultValidation = {
  Username: {
    Notification: "",
    Valid: null,
  },
  Email: {
    Notification: "",
    Valid: null,
  },
  Password: {
    Notification: "",
    Valid: null,
  },
  Form: {
    Valid: false,
  },
};
const DefaultErrorValues = {
  isError: false,
  Message: "",
};

function PopUpRegister({ setToggleForm }: any) {
  const dispatch = useDispatch();
  const [userDetails, setUserDetails] = useState(DefaultUserDetails);
  const [validationDetails, setValidationDetails] = useState(DefaultValidation);
  const [errorValues, setErrorValues] = useState(DefaultErrorValues);

  const inputValidation = (Name: string, Value: string) => {
    const response: any = useInputValidation(Name, Value);
    setValidationDetails({
      ...validationDetails,
      [response?.InputName]: {
        Notification: response.Notification,
        Valid: response.valid,
      },
    });
  };

  const addUserHandler = async (
    username: string,
    email: string,
    password: string
  ) => {
    dispatch(
      showLoadingPopUp({
        ActionName: "Signing Up",
        LoadingMessage: "Please wait while we check and store your information",
        isLoading: true,
      })
    );
    const response = await addUser(username, email, password);
    dispatch(hideLoadingPopUp());
    setUserDetails(DefaultUserDetails);
    CheckResponse(response);
  };
  const CheckResponse = (response: any) => {
    if (response.User !== null) {
      dispatch(
        showNotifPopUp({
          NotifType: "Register",
          NotifName: "Notification",
          NotifMessage: "Registered Successfully. You can now Login.",
          NotifAction: null,
          show: true,
        })
      );
    }
    if (response.Error !== null) {
      setErrorValues({
        isError: true,
        Message: `${response?.Error.message}/Email already exist`,
      });
    }
  };

  useEffect(() => {
    if (
      validationDetails.Username.Valid === true &&
      validationDetails.Email.Valid === true &&
      validationDetails.Password.Valid === true
    ) {
      setValidationDetails({ ...validationDetails, Form: { Valid: true } });
    }
  }, [
    validationDetails.Username.Valid,
    validationDetails.Email.Valid,
    validationDetails.Password.Valid,
  ]);

  return (
    <motion.div
      className={styles.registerContainer}
      variants={DropIn}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className={styles.headerContainer}>
        <div className={styles.logoContainer}>
          <Image src="/img/Logo.png" layout="fill" objectFit="contain" alt="" />
        </div>
        <h2>Workoutly</h2>
      </div>
      <h3>Fill up the form to Register</h3>
      <form className={styles.formControl} autoComplete="off">
        <div className={styles.inputContainer}>
          <Input
            Type="text"
            Name="username"
            Label="Username"
            inputValue={userDetails.username}
            setInputValue={(e: any) => {
              setUserDetails({ ...userDetails, username: e.target.value });
              inputValidation("Username", e.target.value);
            }}
            enableValidation={true}
            Notification={validationDetails.Username.Notification}
            Valid={validationDetails.Username.Valid}
            Disabled={false}
          />
        </div>
        <div className={styles.inputContainer}>
          <Input
            Type="text"
            Name="email"
            Label="Email"
            inputValue={userDetails.email}
            setInputValue={(e: any) => {
              setUserDetails({ ...userDetails, email: e.target.value });
              inputValidation("Email", e.target.value);
            }}
            enableValidation={true}
            Notification={validationDetails.Email.Notification}
            Valid={validationDetails.Email.Valid}
            Disabled={false}
          />
        </div>
        <div className={styles.inputContainer}>
          <Input
            Type="password"
            Name="password"
            Label="Password"
            inputValue={userDetails.password}
            setInputValue={(e: any) => {
              setUserDetails({ ...userDetails, password: e.target.value });
              inputValidation("Password", e.target.value);
            }}
            enableValidation={true}
            Notification={validationDetails.Password.Notification}
            Valid={validationDetails.Password.Valid}
            Disabled={false}
          />
        </div>
        {errorValues.isError && (
          <p className={styles.errorMessage}>{errorValues.Message}</p>
        )}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();

            addUserHandler(
              userDetails.username,
              userDetails.email,
              userDetails.password
            );
          }}
          style={{
            opacity: validationDetails.Form.Valid === false ? "0.6" : "1",
            cursor:
              validationDetails.Form.Valid === false ? "no-drop" : "pointer",
          }}
          disabled={validationDetails.Form.Valid === false ? true : false}
        >
          Submit
        </button>
      </form>
      <div className={styles.loginContainer}>
        <p>
          Already have an account?
          <span onClick={() => setToggleForm("loginForm")}>Click here</span>
        </p>
      </div>
    </motion.div>
  );
}

export default PopUpRegister;
