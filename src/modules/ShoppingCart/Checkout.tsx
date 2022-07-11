import { useSelector } from "react-redux";
import styles from "../../../styles/ShoppingCart/ShoppingCart.module.css";
import { RootState } from "../../Redux/store";

function Checkout() {
  const cartPrice = useSelector((state: RootState) => state.cartReducer.price);

  return (
    <div className={styles.checkOutContainer}>
      <div className={styles.checkoutInfo}>
        <p>
          <>Total items: {cartPrice.totalItems}</>
        </p>
        <p>
          <>Price: {cartPrice.totalPrice}$</>
        </p>
      </div>
      <button>Checkout</button>
    </div>
  );
}

export default Checkout;
