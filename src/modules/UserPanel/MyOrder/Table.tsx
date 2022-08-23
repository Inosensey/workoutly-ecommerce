import { OrderDetailsType } from "../Logic/Types";
import styles from "../../../../styles/UserPanel/Table.module.css";
import { Item } from "../../../TypeScript/ReusableTypes";

function Table(props: {
  orders: OrderDetailsType[];
  loading: boolean;
  setTrackNumber: any;
  setToggleTrackDetails: any;
}) {
  return (
    <>
      <div className={styles.header}>
        <h2>My Orders table</h2>
      </div>
      <div className={styles.tableContainer}>
        {props.loading ? (
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
        ) : props.orders.length === 0 ? (
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
              {props.orders.length === 0 ? (
                <tr>
                  <td>Loading</td>
                </tr>
              ) : (
                props.orders.map((details: OrderDetailsType) => (
                  <tr key={details.order_id}>
                    <td className={styles.trackBtnContainer}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          props.setTrackNumber(details.track_id);
                          props.setToggleTrackDetails(true);
                        }}
                      >
                        Track
                      </button>
                    </td>
                    <td>{details.order_id}</td>
                    <td>{details.full_name}</td>
                    <td>
                      {details.item_metadata
                        .map((item: Item) => `${item.itemInfo.productName}`)
                        .join(", ")}
                    </td>
                    <td>{details.total_price}$</td>
                    <td>{details.address.province}</td>
                    <td>{details.address.region}</td>
                    <td>{details.address.city}</td>
                    <td>{details.address.street}</td>
                    <td>{details.status}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default Table;
