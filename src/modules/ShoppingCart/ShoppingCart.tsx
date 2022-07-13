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
  const cartItems = useSelector(
    (state: RootState) => state.cartReducer.cartItem
  );

  // Framer Motion
  const OverlayVariant = {
    open: {
      display: "block",
    },
    close: {
      opacity: "none",
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

  return (
    <motion.div
      className={styles.overlay}
      variants={OverlayVariant}
      animate="open"
      initial="close"
      exit="close"
    >
      <motion.div variants={SlideIn} className={styles.container}>
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
