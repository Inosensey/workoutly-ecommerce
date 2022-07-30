import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { supabase } from "../../Services/Supabase/supabaseClient";
import { showNotifPopUp } from "../../Redux/Reducers/PopUpNotif";
import { openPopUpCheckOut } from "../../Redux/Reducers/PopUpCheckOut";
import styles from "../../../styles/ShoppingCart/ShoppingCart.module.css";

function Checkout() {
  const dispatch = useDispatch();
  const cartPrice = useSelector((state: RootState) => state.cartReducer.price);
  const cartItems = useSelector(
    (state: RootState) => state.cartReducer.cartItem
  );
  const session = supabase.auth.session();
  const CheckOutHandler = async () => {
    if (session === null) {
      return dispatch(
        showNotifPopUp({
          NotifType: "Checkout",
          NotifName: "Notification",
          NotifMessage: "You must sign-in first in order to Check out",
          NotifAction: null,
          show: true,
        })
      );
    }
    if (cartItems.length === 0) {
      return dispatch(
        showNotifPopUp({
          NotifType: "Checkout",
          NotifName: "Notification",
          NotifMessage: "You have no item in your cart.",
          NotifAction: null,
          show: true,
        })
      );
    }
    dispatch(openPopUpCheckOut());
  };
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
      <button onClick={() => CheckOutHandler()}>Checkout</button>
    </div>
  );
}

export default Checkout;
