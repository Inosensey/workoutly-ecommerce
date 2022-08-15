import { useEffect, useState } from "react";
import { Order } from "../../../TypeScript/ReusableTypes";
import styles from "../../../../styles/UserPanel/OrderDetails.module.css";

interface Props {
  order: Order[];
}

function Orders({ order }: Props) {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const date = new Date(
    order.length !== 0 ? order[0].purchased_at : Date.now()
  );
  date.setDate(date.getDate() + 1 * 7);
  const expected_arrival = date.toLocaleDateString();
  return (
    <div className={styles.container}>
      {order.length !== 0 && (
        <>
          <div className={styles.headerContainer}>
            <div className={styles.orderIdContainer}>
              <h4>Order ID:</h4>
              <p>{order[0].order_id}</p>
            </div>
            <div className={styles.dateContainer}>
              <h4>Purchase Date:</h4>
              <p>{order[0].purchased_at.toString()}</p>
            </div>
            <div className={styles.dateContainer}>
              <h4>Expected arrival:</h4>
              <p>{expected_arrival}</p>
            </div>
          </div>
          <div className={styles.orderInfoContainer}>
            {order[0].item_metadata.map((item: any) => (
              <div className={styles.orderInfo} key={item.itemInfo.id}>
                <div className={styles.info}>
                  <h4>{item.itemInfo.productName}</h4>
                  <p>Quantity: {item.Quantity}</p>
                  <p>
                    Price: {item.itemInfo.productPrice * item.Quantity}$ via
                    (COD)
                  </p>
                </div>
                <div className={styles.productPhotoContainer}>
                  <div className={styles.product}>
                    <img src={item.itemInfo.productPhoto.url} alt="" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.progressBarContainer}>
            <div className={styles.progressBar}>
              <div
                className={styles.progress}
                style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
              ></div>
              <div className={styles.progressStepContainer}>
                <p
                  className={
                    0 < currentStep
                      ? `${styles.stepNumber} ${styles.activeStep}`
                      : styles.stepNumber
                  }
                >
                  1
                </p>
                <p>Packed</p>
              </div>
              <div
                className={styles.progressStepContainer}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <p
                  className={
                    1 < currentStep
                      ? `${styles.stepNumber} ${styles.activeStep}`
                      : styles.stepNumber
                  }
                >
                  2
                </p>
                <p>Placed</p>
              </div>
              <div
                className={styles.progressStepContainer}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <p
                  className={
                    2 < currentStep
                      ? `${styles.stepNumber} ${styles.activeStep}`
                      : styles.stepNumber
                  }
                >
                  3
                </p>
                <p>Shipped</p>
              </div>
              <div
                className={styles.progressStepContainer}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                }}
              >
                <p
                  className={
                    3 < currentStep
                      ? `${styles.stepNumber} ${styles.activeStep}`
                      : styles.stepNumber
                  }
                >
                  4
                </p>
                <p>Delivered</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Orders;
