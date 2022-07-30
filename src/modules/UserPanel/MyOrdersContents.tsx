import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import getOrders from "../../Services/Supabase/getOrders";
import styles from "../../../styles/UserPanel/MyOrders.module.css";
import TrackDetails from "./MyOrder/TrackDetails";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [trackNumber, setTrackNumber] = useState("");
  const [toggleTrackDetails, setToggleTrackDetails] = useState(false);
  const [loading, setLoading] = useState(true);

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
          <div className={styles.header}>
            <h2>My Orders table</h2>
          </div>
          <div className={styles.tableContainer}>
            {loading ? (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#fff",
                  fontSize: "1.4rem",
                }}
              >
                <p>Loading</p>
              </div>
            ) : orders.length === 0 ? (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#fff",
                  fontSize: "1.4rem",
                }}
              >
                <p>No Orders yet</p>
              </div>
            ) : (
              <table className={styles.orderTable}>
                <thead>
                  <tr>
                    <th>Action</th>
                    <th>Order Id</th>
                    <th>Full name</th>
                    <th>Items</th>
                    <th>Price</th>
                    <th>Province</th>
                    <th>Region</th>
                    <th>City</th>
                    <th>Street</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.length === 0 ? (
                    <tr>
                      <td>Loading</td>
                    </tr>
                  ) : (
                    orders.map((details: any) => (
                      <tr key={details.order_id}>
                        <td className={styles.trackBtnContainer}>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setTrackNumber(details.track_number);
                              setToggleTrackDetails(true);
                            }}
                          >
                            Track
                          </button>
                        </td>
                        <td>{details.order_id}</td>
                        <td>{details.full_name}</td>
                        <td>
                          {details.item_metadata
                            .map((item: any) => `${item.itemInfo.productName}`)
                            .join(", ")}
                        </td>
                        <td>{details.total_price}$</td>
                        <td>{details.address.province}</td>
                        <td>{details.address.region}</td>
                        <td>{details.address.city}</td>
                        <td>{details.address.street}</td>
                        <td>{details.status}%</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>
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
