import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Orders from "./Orders";

import styles from "../../../../styles/UserPanel/TrackDetails.module.css";
import trackOrder from "../../../Services/Supabase/trackOrder";

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
  const [order, setOrder] = useState([]);

  useEffect(() => {
    getTrackDetailsHandler();
  }, []);

  const getTrackDetailsHandler = async () => {
    const response: any = await trackOrder(trackNumber);
    setOrder(response?.data);
    console.log(response);
  };
  return (
    <div className={styles.overlay}>
      <motion.div
        className={styles.container}
        variants={DropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <i
          className={`${"fa-solid fa-circle-xmark"} ${styles.xmarkBtn}`}
          onClick={(e) => {
            e.stopPropagation();
            setToggleTrackDetails(false);
          }}
        ></i>
        <div className={styles.receiptContainer}></div>
        <div className={styles.orderDetailsContainer}>
          <Orders order={order} />
        </div>
      </motion.div>
    </div>
  );
}

export default TrackDetails;
