import styles from "../../../styles/ShoppingCart/ShoppingCart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

function ShoppingCart() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <i className="fa-solid fa-angle-left"></i>
        <h2>Your Cart</h2>
        <p>(5 items)</p>
      </div>
      <CartItem />
      <Checkout />
    </div>
  );
}

export default ShoppingCart;
