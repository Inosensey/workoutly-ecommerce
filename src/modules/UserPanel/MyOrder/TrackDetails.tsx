import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  showLoadingPopUp,
  hideLoadingPopUp,
} from "../../../Redux/Reducers/PopUpLoading";
import trackOrder from "../../../Services/Supabase/trackOrder";
import Orders from "./Orders";
import Receipt from "./Receipt";
import { Order } from "../../../TypeScript/ReusableTypes";
import styles from "../../../../styles/UserPanel/TrackDetails.module.css";

interface Props {
  trackNumber: string;
  setToggleTrackDetails: any;
}

// Framer Motion Variants
const DropIn = {
  hidden: {
    y: "-10vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.4,
      type: "tween",
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

function TrackDetails({ trackNumber, setToggleTrackDetails }: Props) {
  const dispatch = useDispatch();
  const [order, setOrder] = useState<Order[]>([]);

  useEffect(() => {
    getTrackDetailsHandler();
  }, []);

  const getTrackDetailsHandler = async () => {
    dispatch(
      showLoadingPopUp({
        ActionName: "Tracking Order",
        LoadingMessage: "Tracking order please wait",
        isLoading: true,
      })
    );
    const response: any = await trackOrder(trackNumber);
    console.log(response.data);
    dispatch(hideLoadingPopUp());
    setOrder(response?.data);
  };
  if (order.length === 0) return <div></div>;
  return (
    <div className={styles.overlay}>
      <i
        className={`${"fa-solid fa-circle-xmark"} ${styles.xmarkBtn}`}
        onClick={(e) => {
          e.stopPropagation();
          setToggleTrackDetails(false);
        }}
      ></i>
      <motion.div
        className={styles.container}
        variants={DropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className={styles.receiptContainer}>
          <Receipt order={order} />
        </div>
        <div className={styles.orderDetailsContainer}>
          <Orders order={order} />
        </div>
      </motion.div>
    </div>
  );
}

export default TrackDetails;
