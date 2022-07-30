import { useEffect, useState } from "react";
import getOrders from "../../Services/Supabase/getOrders";
import styles from "../../../styles/UserPanel/MyOrders.module.css";

function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrdersHandler();
  }, []);

  const getOrdersHandler = async () => {
    const response: any = await getOrders();
    setOrders(response?.data);
    console.log(response);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h2>My Orders table</h2>
        </div>
        <div className={styles.tableContainer}>
          <table className={styles.orderTable}>
            <thead>
              <tr>
                <th>Order Id</th>
                <th>Full name</th>
                <th>Items</th>
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
                  <tr>
                    <td>{details.order_id}</td>
                    <td>{details.full_name}</td>
                    <td>
                      {details.item_metadata
                        .map((item: any) => `${item.itemInfo.productName}`)
                        .join(", ")}
                    </td>
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
        </div>
      </div>
    </div>
  );
}

export default MyOrders;
