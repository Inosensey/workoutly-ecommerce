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
    <div className={styles.overlay}>
      <motion.div
        variants={SlideIn}
        className={styles.container}
        initial="close"
        animate="open"
        exit="close"
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
    </div>
  );
}

export default ShoppingCart;
