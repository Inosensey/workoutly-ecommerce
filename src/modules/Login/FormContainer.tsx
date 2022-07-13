import PopUpLogin from "./PopUpLogin";
import PopUpRegister from "./PopUpRegister";
import styles from "../../../styles/PopLogin/PopLogin.module.css";
import { useState } from "react";

function FormContainer() {
  const [toggleForm, setToggleForm] = useState("loginForm");

  return (
    <div className={styles.overlay}>
      {toggleForm === "loginForm" && (
        <PopUpLogin setToggleForm={setToggleForm} />
      )}
      {toggleForm === "registerForm" && (
        <PopUpRegister setToggleForm={setToggleForm} />
      )}
    </div>
  );
}

export default FormContainer;
