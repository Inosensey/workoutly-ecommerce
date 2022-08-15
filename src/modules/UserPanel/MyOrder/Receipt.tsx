import { useEffect, useState } from "react";
import { Item, Order } from "../../../TypeScript/ReusableTypes";
import styles from "../../../../styles/UserPanel/ReceiptDetails.module.css";

interface Props {
  order: Order[];
}

function Receipt({ order }: Props) {
  const [originalPrice, setOriginalPrice] = useState<number>(0);

  useEffect(() => {
    getPrices();
  }, [order]);

  const getPrices = () => {
    let totalItemPrice = 0;
    if (order.length === 0) return;
    order[0].item_metadata.map((item: Item) => {
      totalItemPrice += item.Quantity * item.itemInfo.productPrice;
      return totalItemPrice;
    });
    setOriginalPrice(totalItemPrice + Number(2.99));
    console.log(totalItemPrice);
  };
  return (
    <div className={styles.container}>
      <h3>Purchased Receipt</h3>
      {order.length !== 0 && (
        <>
          <div className={styles.header}>
            <h3>{order[0].full_name}</h3>
            <p>Thank you for your order.</p>
          </div>
          <div className={styles.paymentSummaryContainer}>
            <h4>Payment Summary</h4>
            <div className={styles.itemContainer}>
              {order[0].item_metadata.map((item: Item) => (
                <div className={styles.item} key={item.itemInfo.id}>
                  <p>
                    {item.itemInfo.productName} (Qty: {item.Quantity})
                  </p>
                  <p>{item.Quantity * item.itemInfo.productPrice}$</p>
                </div>
              ))}
              <div className={styles.pricesInfoContainer}>
                <p>Delivery</p>
                <p>2.99$</p>
              </div>
              <div className={styles.pricesInfoContainer}>
                <p>Discount</p>
                <p>50%</p>
              </div>
              <div className={styles.pricesInfoContainer}>
                <p>Original Price</p>
                <p>{originalPrice.toFixed(2)}$</p>
              </div>
              <div className={styles.pricesInfoContainer}>
                <p>Discounted Price</p>
                <p>{order[0].total_price}$</p>
              </div>
              <div></div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Receipt;
