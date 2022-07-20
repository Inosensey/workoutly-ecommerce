import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openCart } from "../Redux/Reducers/Cart";
import { openPopUpLoginForm } from "../Redux/Reducers/LoginForm";
import { removeSession } from "../Redux/Reducers/Auth";
import type { RootState } from "../Redux/store";
import { supabase } from "../Services/supabaseClient";
import { toggleLoadingPopUp } from "../Redux/Reducers/PopUpLoading";
import styles from "../../styles/Nav.module.css";
import Link from "next/link";

//Framer motion
const DropDownVariant = {
  hidden: {
    opacity: "0",
    x: "-50%",
    top: "100%",
    transition: {
      type: "tween",
    },
  },
  show: {
    opacity: "1",
    top: "140%",
    x: "-50%",
    transition: {
      type: "tween",
    },
  },
};

function Nav() {
  const dispatch = useDispatch();
  const [currentWindowHeight, setCurrentWindowHeight] = useState(0);
  const [previousWindowHeight, setPreviousWindowHeight] = useState(0);
  const [showDropDown, setShowDropDown] = useState(false);
  const [isScrolling, setIsScrolling] = useState("NotScrolling");
  const cartItem = useSelector(
    (state: RootState) => state.cartReducer.cartItem
  );
  const Session =
    useSelector((state: RootState) => state.AuthReducer.Session) || {};

  const handleScroll = () => {
    setCurrentWindowHeight(window.scrollY);
  };
  const CheckScrollHeight = () => {
    setPreviousWindowHeight(currentWindowHeight);
    if (currentWindowHeight === 0) return setIsScrolling("NotScrolling");
    if (currentWindowHeight > previousWindowHeight)
      return setIsScrolling("ScrollDown");

    if (currentWindowHeight < previousWindowHeight)
      return setIsScrolling("ScrollUp");
  };
  const Logout = async () => {
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
    setShowDropDown(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    CheckScrollHeight();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentWindowHeight]);
  return (
    <nav
      className={
        isScrolling === "NotScrolling"
          ? styles.nav
          : isScrolling === "ScrollUp"
          ? `${styles.nav} ${styles.scrollUp}`
          : `${styles.nav} ${styles.scrollDown}`
      }
    >
      <div className={styles.SiteNameContainer}>
        <div className={styles.logoContainer}>
          <Image src="/img/Logo.png" layout="fill" objectFit="contain" alt="" />
        </div>
        <Link href="/">
          <h2>Workoutly</h2>
        </Link>
      </div>
      <div className={styles.buttons}>
        <div className={styles.myAccountContainer}>
          <i
            onClick={() => {
              if (Object.keys(Session).length !== 0) {
                setShowDropDown((prev) => !prev);
              } else {
                dispatch(openPopUpLoginForm());
              }
            }}
            className="fa-solid fa-circle-user"
          ></i>
          <AnimatePresence
            initial={false}
            exitBeforeEnter={true}
            onExitComplete={() => null}
          >
            {showDropDown && (
              <motion.div
                className={styles.myAccountDropdown}
                variants={DropDownVariant}
                initial="hidden"
                animate="show"
                exit="hidden"
              >
                <ul className={styles.dropdownContainer}>
                  <Link href="/user-panel">
                    <li>
                      <i className="fa-solid fa-user"></i> Manage My Account
                    </li>
                  </Link>
                  <li onClick={() => Logout()}>
                    <i className="fa-solid fa-arrow-right-from-bracket"></i>{" "}
                    Logout
                  </li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className={styles.cartIconContainer}>
          {cartItem.length !== 0 && (
            <span className={styles.cartItemCounter}>
              {cartItem.length <= 9 ? cartItem.length : "9+"}
            </span>
          )}
          <i
            onClick={() => dispatch(openCart())}
            className="fa-solid fa-cart-shopping"
          ></i>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
