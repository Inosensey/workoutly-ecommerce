import Image from "next/image";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { closePopUpLoginForm } from "../../Redux/Reducers/LoginForm";
import styles from "../../../styles/PopLogin/PopLogin.module.css";

function PopUpLogin({ setToggleForm }: any) {
  const dispatch = useDispatch();

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
        <div className={styles.inputControl}>
          <label>Email</label>
          <input type="text" name="" id="" />
        </div>
        <div className={styles.inputControl}>
          <label>Password</label>
          <input type="password" name="" id="" />
        </div>
        <button>Login</button>
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
