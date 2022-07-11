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
  const price = useSelector((state: RootState) => state.cartReducer.price);

  useEffect(() => {
    dispatch(calculatePrice());
  }, [cartItems]);

  // useEffect(() => {
  //   if (toggleCart === true) return (document.body.style.overflow = "hidden");
  //   if (toggleCart === false) return (document.body.style.overflow = "auto");
  // }, [toggleCart]);

  return (
    <div
      className={styles.overlay}
      style={{ display: toggleCart === false ? "none" : "block" }}
    >
      <div
        className={
          toggleCart === false
            ? `${styles.container} ${styles.hideCart}`
            : `${styles.container} ${styles.showCart}`
        }
      >
        <div className={styles.header}>
          <i
            onClick={() => dispatch(closeCart())}
            className="fa-solid fa-circle-left"
          ></i>
          <h2>Shopping Cart</h2>
          <p>(5 items)</p>
        </div>
        <CartItem />
        <Checkout />
      </div>
    </div>
  );
}

export default ShoppingCart;
