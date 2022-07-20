import Image from "next/image";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { closePopUpLoginForm } from "../../Redux/Reducers/LoginForm";
import { addSession } from "../../Redux/Reducers/Auth";
import { toggleLoadingPopUp } from "../../Redux/Reducers/PopUpLoading";
import loginUser from "../../Services/Auth/loginUser";
import Input from "../../common/input/Input";
import styles from "../../../styles/PopLogin/PopLogin.module.css";

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

const DefaultLoginValues = {
  email: "",
  password: "",
};
const DefaultErrorValues = {
  isError: false,
  Message: "",
};

function PopUpLogin({ setToggleForm }: any) {
  const dispatch = useDispatch();
  const [loginDetails, setLoginDetails] = useState(DefaultLoginValues);
  const [errorValues, setErrorValues] = useState(DefaultErrorValues);

  const LoginHandler = async (email: string, password: string) => {
    const response = await loginUser(email, password);
    return response;
  };
  const checkLoginResponse = (response: any) => {
    if (response.Error !== null) {
      setErrorValues({ isError: true, Message: response?.Error.message });
    } else {
      setErrorValues(DefaultErrorValues);
      dispatch(
        addSession({
          Auth: response?.Session,
          User: response?.User,
        })
      );
      dispatch(closePopUpLoginForm());
    }

    setLoginDetails(DefaultLoginValues);
  };

  return (
    <motion.div
      className={styles.loginContainer}
      variants={DropIn}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <i
        onClick={() => dispatch(closePopUpLoginForm())}
        className={`fa-solid fa-circle-xmark ${styles.closePopUp}`}
      ></i>
      <div className={styles.headerContainer}>
        <div className={styles.logoContainer}>
          <Image src="/img/Logo.png" layout="fill" objectFit="contain" alt="" />
        </div>
        <h2>Workoutly</h2>
      </div>
      <form className={styles.formControl}>
        <div className={styles.inputContainer}>
          <Input
            Type="email"
            Name="email"
            Label="Email"
            inputValue={loginDetails.email}
            setInputValue={(e: any) => {
              setLoginDetails({ ...loginDetails, email: e.target.value });
            }}
            enableValidation={false}
            Notification={""}
            Valid={null}
            Disabled={false}
          />
        </div>
        <div className={styles.inputContainer}>
          <Input
            Type="password"
            Name="password"
            Label="Password"
            inputValue={loginDetails.password}
            setInputValue={(e: any) => {
              setLoginDetails({ ...loginDetails, password: e.target.value });
            }}
            enableValidation={false}
            Notification={""}
            Valid={null}
            Disabled={false}
          />
        </div>
        {errorValues.isError && (
          <p className={styles.errorMessage}>{errorValues.Message}</p>
        )}
        <button
          onClick={async (e) => {
            e.preventDefault();
            e.stopPropagation();
            dispatch(
              toggleLoadingPopUp({
                ActionName: "Logging in",
                LoadingMessage:
                  "Please wait while we check your login credentials",
                isLoading: true,
              })
            );
            const result = await LoginHandler(
              loginDetails.email,
              loginDetails.password
            );
            checkLoginResponse(result);
            dispatch(
              toggleLoadingPopUp({
                ActionName: "",
                LoadingMessage: "",
                isLoading: false,
              })
            );
          }}
        >
          Login
        </button>
      </form>
      <div className={styles.existingAccounts}>
        <div className={styles.separationORContainer}>
          <hr />
          <p>Or</p>
          <hr />
        </div>
        <div className={styles.workoutlyAccount}>
          <div className={styles.logoContainer}>
            <Image
              src="/img/Logo.png"
              layout="fill"
              objectFit="contain"
              alt=""
            />
          </div>
          <p>Continue with Workoutly account</p>
        </div>
      </div>
      <div className={styles.registerContainer}>
        <p>
          Doesn't have an account?{" "}
          <span onClick={() => setToggleForm("registerForm")}>Click here</span>
        </p>
      </div>
    </motion.div>
  );
}

export default PopUpLogin;
