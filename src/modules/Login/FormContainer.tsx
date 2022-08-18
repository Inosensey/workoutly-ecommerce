import PopUpLogin from "./PopUpLogin";
import PopUpRegister from "./PopUpRegister";
import styles from "../../../styles/PopLogin/PopLogin.module.css";
import { useState } from "react";

function FormContainer() {
  const [toggleForm, setToggleForm] = useState("loginForm");

  return (
    <div
      style={{
        background: "rgba(0, 0, 0, 0.7)",
        width: "100%",
        height: "100vh",
        position: "fixed",
        top: "0",
        left: "0",
        zIndex: "100",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
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
