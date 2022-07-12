import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openCart } from "../Redux/Reducers/Cart";
import { openPopUpLoginForm } from "../Redux/Reducers/LoginForm";
import type { RootState } from "../Redux/store";
import styles from "../../styles/Nav.module.css";
import Link from "next/link";

function Nav() {
  const dispatch = useDispatch();
  const [currentWindowHeight, setCurrentWindowHeight] = useState(0);
  const [previousWindowHeight, setPreviousWindowHeight] = useState(0);
  const [isScrolling, setIsScrolling] = useState("NotScrolling");
  const cartItem = useSelector(
    (state: RootState) => state.cartReducer.cartItem
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
        <i
          onClick={() => dispatch(openPopUpLoginForm())}
          className="fa-solid fa-circle-user"
        ></i>
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
