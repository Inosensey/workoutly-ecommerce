import styles from "../../../styles/ShoppingCart/ShoppingCart.module.css";

function Checkout() {
  return (
    <div className={styles.checkOutContainer}>
      <div className={styles.checkoutInfo}>
        <p>Subtotal:</p>
        <p>Price</p>
      </div>
      <button>Checkout</button>
    </div>
  );
}

export default Checkout;
