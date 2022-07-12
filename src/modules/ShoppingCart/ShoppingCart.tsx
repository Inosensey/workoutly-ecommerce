import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeCart, calculatePrice } from "../../Redux/Reducers/Cart";
import { RootState } from "../../Redux/store";
import styles from "../../../styles/ShoppingCart/ShoppingCart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

function ShoppingCart() {
  const dispatch = useDispatch();
  const toggleCart = useSelector(
    (state: RootState) => state.cartReducer.toggleCart
  );
  const cartItems = useSelector(
    (state: RootState) => state.cartReducer.cartItem
  );

  // Framer Motion
  const SlideControl = useAnimation();
  const OverlayControl = useAnimation();
  const OverlayVariant = {
    open: {
      opacity: 1,
      zIndex: "101",
    },
    close: {
      opacity: 0,
      zIndex: "0",
    },
  };
  const SlideIn = {
    open: {
      x: "0%",
      transition: {
        type: "tween",
      },
    },
    close: {
      x: "100%",
      transition: {
        type: "tween",
      },
    },
  };

  useEffect(() => {
    dispatch(calculatePrice());
  }, [cartItems]);
  useEffect(() => {
    if (toggleCart === true) {
      OverlayControl.start("open");
      SlideControl.start("open");
    }
    if (toggleCart === false) {
      OverlayControl.start("close");
      SlideControl.start("close");
    }
  }, [toggleCart]);

  return (
    <motion.div
      className={styles.overlay}
      variants={OverlayVariant}
      animate={OverlayControl}
      initial="close"
    >
      <motion.div
        variants={SlideIn}
        animate={SlideControl}
        className={
          styles.container
          // toggleCart === false
          //   ? `${styles.container} ${styles.hideCart}`
          //   : `${styles.container} ${styles.showCart}`
        }
      >
        <div className={styles.header}>
          <i
            onClick={() => dispatch(closeCart())}
            className="fa-solid fa-circle-left"
          ></i>
          <h2>Shopping Cart</h2>
          <p>
            {cartItems.length}{" "}
            {cartItems.length === 0 || cartItems.length === 1
              ? "Item"
              : "Items"}
          </p>
        </div>
        <CartItem />
        <Checkout />
      </motion.div>
    </motion.div>
  );
}

export default ShoppingCart;
