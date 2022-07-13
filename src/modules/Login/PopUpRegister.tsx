import Image from "next/image";
import { motion } from "framer-motion";
import styles from "../../../styles/PopLogin/PopUpRegister.module.css";

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

function PopUpRegister({ setToggleForm }: any) {
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
      <h3>Fill up the form to Regsiter</h3>
      <form className={styles.formControl}>
        <div className={styles.inputControl}>
          <label>Email</label>
          <input type="text" name="" id="" />
        </div>
        <div className={styles.inputControl}>
          <label>Password</label>
          <input type="password" name="" id="" />
        </div>
        <button>Submit</button>
      </form>
      <div className={styles.loginContainer}>
        <p>
          Already have an account?{" "}
          <span onClick={() => setToggleForm("loginForm")}>Click here</span>
        </p>
      </div>
    </motion.div>
  );
}

export default PopUpRegister;
