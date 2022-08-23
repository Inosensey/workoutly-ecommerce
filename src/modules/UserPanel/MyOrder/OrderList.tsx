import styles from "../../../../styles/UserPanel/OrderList.module.css";
import { Item } from "../../../TypeScript/ReusableTypes";
import { OrderDetailsType } from "../Logic/Types";

function OrderList(props: {
  orders: OrderDetailsType[];
  loading: boolean;
  setTrackNumber: any;
  setToggleTrackDetails: any;
}) {
  console.log(props.orders);
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>My Orders</h2>
      </div>
      <div className={styles.content}>
        <div className={styles.orderContainer}>
          {props.orders.map((details: OrderDetailsType) => (
            <>
              <div className={styles.orders}>
                <div className={styles.orderInfo}>
                  <label>Full name:</label>
                  <p>{details.full_name}</p>
                </div>
                <div className={styles.orderInfo}>
                  <label>Address:</label>
                  <p>
                    {details.address.street}, {details.address.city}
                  </p>
                </div>
                <div className={styles.orderInfo}>
                  <label>Order Id:</label>
                  <p>{details.order_id}</p>
                </div>
                {details.item_metadata.map((item: Item) => (
                  <div className={styles.orderInfo}>
                    <label>Product name:</label>
                    <p>{item.itemInfo.productName}</p>
                  </div>
                ))}
                <div className={styles.orderInfo}>
                  <label>Total price:</label>
                  <p>{details.total_price}$</p>
                </div>
                <div className={styles.orderInfo}>
                  <label>Status</label>
                  <p>{details.status}</p>
                </div>
                <div className={styles.btnContainer}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      props.setTrackNumber(details.track_id);
                      props.setToggleTrackDetails(true);
                    }}
                  >
                    Track
                  </button>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OrderList;
