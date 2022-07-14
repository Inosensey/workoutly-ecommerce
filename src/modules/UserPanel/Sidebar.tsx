import Image from "next/image";
import { motion } from "framer-motion";
import styles from "../../../styles/UserPanel/Sidebar.module.css";

function Sidebar() {
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
        <motion.li whileHover={{ scale: 1.1 }}>
          <i className="fa-solid fa-shop"></i>Go Shopping
        </motion.li>
      </ul>
      <div className={styles.logoutContainer}>
        <p>Logout</p>
      </div>
    </div>
  );
}

export default Sidebar;
