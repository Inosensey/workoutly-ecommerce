import { Audio, Triangle } from "react-loader-spinner";
import { RootState } from "../Redux/store";
import { useSelector } from "react-redux";
import styles from "../../styles/Common/LoadingPopUp.module.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function LoadingPopUp() {
  const ToggleLoadingPopUp = useSelector(
    (state: RootState) => state.LoadingPopUpReducer
  );

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.header}>
            <p>{ToggleLoadingPopUp.ActionName}</p>
          </div>
          <div className={styles.message}>
            <p>{ToggleLoadingPopUp.LoadingMessage}</p>
            <Triangle
              height="40"
              width="40"
              color="#ff7777"
              ariaLabel="loading"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoadingPopUp;
