import { useSelector } from "react-redux";
import Image from "next/image";
import { RootState } from "../../Redux/store";
import { Item } from "../../TypeScript/ReusableTypes";
import styles from "../../../styles/Checkout/OrderSummary.module.css";

function OrderSummary() {
  const cartPrice = useSelector((state: RootState) => state.cartReducer.price);
  const cartItems = useSelector(
    (state: RootState) => state.cartReducer.cartItem
  );
  const originalPrice = Number(cartPrice.totalPrice) + Number(2.99);
  const totalPrice = 0.5 * (Number(cartPrice.totalPrice) + 2.99);
  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Order Summary</h2>
      <div className={styles.itemContainer}>
        {cartItems.map((item: Item) => (
          <div className={styles.item} key={Math.random() * 1000}>
            <div className={styles.itemPhotoContainer}>
              <div className={styles.itemPhoto}>
                <Image
                  src={`${item.itemInfo.productPhoto.url}`}
                  alt={item.itemInfo.productName}
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            </div>
            <div className={styles.itemInfoContainer}>
              <p>{item.itemInfo.productName}</p>
              <p>{item.itemInfo.productPrice}$</p>
              <p>Quantity: {item.Quantity}</p>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.priceInfoContainer}>
        <p>Discount: 50%</p>
        <p>Delivery: 2.99$</p>
        <div className={styles.pricesContainer}>
          <p>
            <>Original Price: {parseFloat(originalPrice.toFixed(2))}$</>
          </p>
          <p>Discounted Price: {parseFloat(totalPrice.toFixed(2))}$</p>
        </div>
      </div>
    </div>
  );
}

export default OrderSummary;
