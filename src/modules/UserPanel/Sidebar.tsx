import Image from "next/image";
import { useDispatch } from "react-redux";
import { removeSession } from "../../Redux/Reducers/Auth";
import {
  hideLoadingPopUp,
  showLoadingPopUp,
} from "../../Redux/Reducers/PopUpLoading";
import { motion, useAnimation } from "framer-motion";
import Link from "next/link";
import { supabase } from "../../Services/Supabase/supabaseClient";
import Router from "next/router";
import { setLink } from "../../Redux/Reducers/SidebarLinks";
import styles from "../../../styles/UserPanel/Sidebar.module.css";
import { useEffect } from "react";

function Sidebar(props: {
  isMobile: boolean;
  showSidebar: boolean;
  setShowSidebar: any;
}) {
  const dispatch = useDispatch();

  const logout = async () => {
    dispatch(
      showLoadingPopUp({
        ActionName: "Logging out",
        LoadingMessage: "Please wait while we sign out your account",
        isLoading: true,
      })
    );
    await supabase.auth.signOut();
    dispatch(removeSession());
    dispatch(hideLoadingPopUp());
    Router.push("/");
  };

  const ChangeLink = (Link: string) => {
    dispatch(setLink(Link));
  };

  const SidebarAction = useAnimation();
  const OverlayAction = useAnimation();
  const OverlayVariants = {
    show: {
      display: "block",
    },
    hide: (isMobile: boolean) => ({
      display: isMobile ? "none" : "none",
    }),
  };
  const SidebarVariants = {
    show: {
      x: 0,
      transition: {
        type: "tween",
      },
    },
    hide: (isMobile: boolean) => ({
      x: isMobile ? "-100%" : 0,
      transition: {
        type: "tween",
      },
    }),
  };
  useEffect(() => {
    SidebarAction.start("hide");
    OverlayAction.start("hide");
  }, [props.isMobile]);
  useEffect(() => {
    if (props.isMobile !== true) return;
    if (props.showSidebar === true) {
      OverlayAction.start("show");
      SidebarAction.start("show");
    }
    if (props.showSidebar === false) {
      SidebarAction.start("hide");
      OverlayAction.start("hide");
    }
  }, [props.showSidebar]);

  return (
    <>
      <motion.div
        variants={OverlayVariants}
        initial="hide"
        animate={OverlayAction}
        custom={props.isMobile}
        className={styles.overlay}
        onClick={() => props.setShowSidebar(false)}
      ></motion.div>
      <motion.div
        className={styles.container}
        variants={SidebarVariants}
        initial="hide"
        animate={SidebarAction}
        custom={props.isMobile}
      >
        <div className={styles.headerContainer}>
          <div className={styles.logoContainer}>
            <Image
              src="/img/Logo.png"
              layout="fill"
              objectFit="contain"
              alt=""
            />
          </div>
          <h3>Workoutly</h3>
        </div>
        <ul className={styles.menuContainer}>
          <motion.li
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              ChangeLink("My Account");
              props.setShowSidebar(false);
            }}
          >
            <i className="fa-solid fa-user"></i>My Account
          </motion.li>
          <motion.li
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              ChangeLink("My Orders");
              props.setShowSidebar(false);
            }}
          >
            <i className="fa-solid fa-file-lines"></i>My Orders
          </motion.li>
          <motion.li
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              ChangeLink("My Reviews");
              props.setShowSidebar(false);
            }}
          >
            <i className="fa-solid fa-comment-dots"></i>My Reviews
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
      </motion.div>
    </>
  );
}

export default Sidebar;
