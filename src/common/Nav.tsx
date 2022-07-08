import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { openCart, closeCart } from "../Redux/Reducers/Cart";
import type { RootState } from "../Redux/store";
import styles from "../../styles/Nav.module.css";
import Link from "next/link";

function Nav() {
  const dispatch = useDispatch();
  const [currentWindowHeight, setCurrentWindowHeight] = useState(0);
  const [previousWindowHeight, setPreviousWindowHeight] = useState(0);
  const [isScrolling, setIsScrolling] = useState("NotScrolling");
  const toggleCart = useSelector(
    (state: RootState) => state.cartReducer.toggleCart
  );

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
    <div
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
      <div className={styles.overlay}></div>
      <div className={styles.choicesContainer}>
        <i className={`fa-solid fa-xmark ${styles.exitIcon}`}></i>
        <div className={styles.choices}>
          <div className={styles.choice}>
            <p>Home</p>
          </div>
          <div className={styles.choice}>
            <p>Featured</p>
          </div>
          <div className={styles.choice}>
            <p>Limited</p>
          </div>
          <div className={styles.choice}>
            <p>Featured</p>
          </div>
        </div>
      </div>
      <div className={styles.buttons}>
        <button>Get Started</button>
        <div className={styles.burger}>
          <div className={styles.lines}></div>
          <div className={styles.lines}></div>
          <div className={styles.lines}></div>
        </div>
      </div>
    </div>
  );
}

export default Nav;
