import { RootState } from "../Redux/store";
import { useDispatch, useSelector } from "react-redux";
import { toggleNotifPopUp } from "../Redux/Reducers/PopUpNotif";
import styles from "../../styles/Common/PopUp.module.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function NotifPopUp() {
  const dispatch = useDispatch();
  const ToggleNotifPopUp = useSelector(
    (state: RootState) => state.NotifPopUpReducer
  );

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.header}>
            <p>{ToggleNotifPopUp.NotifName}</p>
          </div>
          <div className={styles.message}>
            <p>{ToggleNotifPopUp.LoadingMessage}</p>
            <div className={styles.okBtnContainer}>
              <button
                onClick={() => {
                  dispatch(
                    toggleNotifPopUp({
                      NotifName: "",
                      LoadingMessage: "",
                      show: false,
                    })
                  );
                }}
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotifPopUp;
