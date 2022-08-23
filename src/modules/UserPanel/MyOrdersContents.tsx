import { useEffect, useState } from "react";
import getOrders from "../../Services/Supabase/getOrders";
import TrackDetails from "./MyOrder/TrackDetails";
import { OrderDetailsType } from "./Logic/Types";
import { Item } from "../../TypeScript/ReusableTypes";
import styles from "../../../styles/UserPanel/MyOrders.module.css";
import Table from "./MyOrder/Table";
import OrderList from "./MyOrder/OrderList";

function MyOrders() {
  const [orders, setOrders] = useState<OrderDetailsType[]>([]);
  const [trackNumber, setTrackNumber] = useState<string>("");
  const [toggleTrackDetails, setToggleTrackDetails] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const handleResize = () => {
    let mobile = false;
    if (window.innerWidth <= 769 && mobile === false) {
      mobile = true;
    }
    if (window.innerWidth > 769 && mobile === true) {
      mobile = false;
    }
    setIsMobile(mobile);
    return mobile;
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    getOrdersHandler();
  }, []);

  const getOrdersHandler = async () => {
    const response: any = await getOrders();
    setLoading(false);
    setOrders(response?.data);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          {isMobile ? (
            <OrderList
              orders={orders}
              loading={loading}
              setToggleTrackDetails={setToggleTrackDetails}
              setTrackNumber={setTrackNumber}
            />
          ) : (
            <Table
              orders={orders}
              loading={loading}
              setToggleTrackDetails={setToggleTrackDetails}
              setTrackNumber={setTrackNumber}
            />
          )}
        </div>
      </div>
      {toggleTrackDetails && (
        <TrackDetails
          trackNumber={trackNumber}
          setToggleTrackDetails={setToggleTrackDetails}
        />
      )}
    </>
  );
}

export default MyOrders;
