import { RootState } from "../Redux/store";
import { useDispatch, useSelector } from "react-redux";
import { hideNotifPopUp } from "../Redux/Reducers/PopUpNotif";
import styles from "../../styles/Common/PopUp.module.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Link from "next/link";

function NotifPopUp() {
  const dispatch = useDispatch();
  const ToggleNotifPopUp = useSelector(
    (state: RootState) => state.NotifPopUpReducer
  );
  const CheckNotifType = () => {
    if (ToggleNotifPopUp.NotifType === "Login") {
      return (
        <div className={styles.btnContainer}>
          <button
            onClick={() => {
              dispatch(hideNotifPopUp());
            }}
          >
            Continue Shopping
            <i className="fa-solid fa-cart-shopping"></i>
          </button>
        </div>
      );
    }
    if (
      ToggleNotifPopUp.NotifType === "Register" ||
      ToggleNotifPopUp.NotifType === "Update Personal Details" ||
      ToggleNotifPopUp.NotifType === "Add Address" ||
      ToggleNotifPopUp.NotifType === "Update Address" ||
      ToggleNotifPopUp.NotifType === "Delete Address" ||
      ToggleNotifPopUp.NotifType === "Logout" ||
      ToggleNotifPopUp.NotifType === "Checkout"
    ) {
      return (
        <div className={styles.btnContainer}>
          <button
            onClick={() => {
              dispatch(hideNotifPopUp());
            }}
          >
            Ok
          </button>
        </div>
      );
    }
    if (ToggleNotifPopUp.NotifType === "Add Order") {
      return (
        <div className={styles.btnContainer}>
          <Link href="/user-panel">
            <button
              onClick={() => {
                dispatch(hideNotifPopUp());
              }}
            >
              View
            </button>
          </Link>
          <button
            onClick={() => {
              dispatch(hideNotifPopUp());
            }}
          >
            No
          </button>
        </div>
      );
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.header}>
            <p>{ToggleNotifPopUp.NotifName}</p>
          </div>
          <div className={styles.message}>
            <>
              <p>{ToggleNotifPopUp.NotifMessage}</p>
              {CheckNotifType()}
            </>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotifPopUp;
