import Image from "next/image";
import { useDispatch } from "react-redux";
import { removeSession } from "../../Redux/Reducers/Auth";
import { toggleLoadingPopUp } from "../../Redux/Reducers/PopUpLoading";
import { motion } from "framer-motion";
import Link from "next/link";
import { supabase } from "../../Services/Supabase/supabaseClient";
import styles from "../../../styles/UserPanel/Sidebar.module.css";
import Router from "next/router";

function Sidebar() {
  const dispatch = useDispatch();

  const logout = async () => {
    dispatch(
      toggleLoadingPopUp({
        ActionName: "Logging out",
        LoadingMessage: "Please wait while we sign out your account",
        isLoading: true,
      })
    );
    await supabase.auth.signOut();
    dispatch(removeSession());
    dispatch(
      toggleLoadingPopUp({
        ActionName: "",
        LoadingMessage: "",
        isLoading: false,
      })
    );
    Router.push("/");
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <div className={styles.logoContainer}>
          <Image src="/img/Logo.png" layout="fill" objectFit="contain" alt="" />
        </div>
        <h3>Username</h3>
      </div>
      <ul className={styles.menuContainer}>
        <motion.li whileHover={{ scale: 1.1 }}>
          <i className="fa-solid fa-user"></i>My Account
        </motion.li>
        <motion.li whileHover={{ scale: 1.1 }}>
          <i className="fa-solid fa-file-lines"></i>My Orders
        </motion.li>
        <motion.li whileHover={{ scale: 1.1 }}>
          <i className="fa-solid fa-comment-dots"></i>My Reviews
        </motion.li>
        <motion.li whileHover={{ scale: 1.1 }}>
          <i className="fa-solid fa-bell"></i>Notifications
        </motion.li>
        <Link href="/">
          <motion.li whileHover={{ scale: 1.1 }}>
            <i className="fa-solid fa-shop"></i>Go Shopping
          </motion.li>
        </Link>
      </ul>
      <div className={styles.logoutContainer}>
        <p onClick={() => logout()}>Logout</p>
      </div>
    </div>
  );
}

export default Sidebar;
