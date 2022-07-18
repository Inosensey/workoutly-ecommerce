import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { GraphCmsApi } from "../../Services/GraphcmsApi";
import { gql } from "graphql-request";

import Input from "../../common/input/Input";
import styles from "../../../styles/PopLogin/PopUpRegister.module.css";
import useInputValidation from "../../Hooks/useInputValidation";

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
const MUTATION = gql`
  mutation CreateUserDetail(
    $email: String!
    $username: String!
    $password: String!
    $slug: String!
    $member: Boolean!
  ) {
    createUserDetail(
      data: {
        email: $email
        username: $username
        password: $password
        slug: $slug
        member: $member
      }
    ) {
      id
    }
    publishUserDetail(where: { slug: $username }) {
      username
    }
  }
`;

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

function PopUpRegister({ setToggleForm }: any) {
  const [userDetails, setUserDetails] = useState(DefaultUserDetails);
  const [validationDetails, setValidationDetails] = useState(DefaultValidation);

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

  const addUser = async (data: any) => {
    const response = await GraphCmsApi.request(MUTATION, {
      email: data.email,
      username: data.username,
      password: data.password,
      slug: data.username,
      member: false,
    });
    setUserDetails(DefaultUserDetails);
  };

  useEffect(() => {
    if (
      validationDetails.Email.Valid === true &&
      validationDetails.Username.Valid === true &&
      validationDetails.Password.Valid === true
    ) {
      setValidationDetails({ ...validationDetails, Form: { Valid: true } });
    }
  }, [validationDetails]);

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
      <form className={styles.formControl}>
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
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            addUser(userDetails);
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
