import { useDispatch } from "react-redux";
import { closePopUpCheckOut } from "../../Redux/Reducers/PopUpCheckOut";
import styles from "../../../styles/Checkout/Checkout.module.css";
import OrderSummary from "./OrderSummary";
import PaymentMethod from "./PaymentMethod";

function Checkout() {
  const dispatch = useDispatch();
  return (
    <div className={styles.overlay}>
      <i
        className={`${"fa-solid fa-circle-xmark"} ${styles.xmarkBtn}`}
        onClick={(e) => {
          e.stopPropagation();
          dispatch(closePopUpCheckOut());
        }}
      ></i>
      <div className={styles.container}>
        <div className={styles.checkoutContainer}>
          <div className={styles.orderSummaryContainer}>
            <OrderSummary />
          </div>
          <div className={styles.paymentMethodContainer}>
            <PaymentMethod />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
