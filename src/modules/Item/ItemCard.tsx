import { useState } from "react";
import styles from "../../../styles/Item/Item.module.css";

function ItemCard({ item }: any) {
  const [quantityCount, setQuantityCount] = useState(1);

  const increaseQuantity = () => {
    setQuantityCount(quantityCount + 1);
  };
  const decreaseQuantity = () => {
    if (quantityCount === 1) return null;
    setQuantityCount(quantityCount - 1);
  };

  return (
    <div className={styles.itemContainer}>
      <div className={styles.productPhotoContainer}>
        <img src={item.productPhoto.url} alt="" />
      </div>
      <div className={styles.productInfoContainer}>
        <h3 className={styles.itemName}>{item.productName}</h3>
        <p>Rating: {item.rating}</p>
        <div className={styles.descriptionContainer}>
          <h4>Details:</h4>
          <p>{item.description.text}</p>
        </div>
        <p className={styles.itemPrice}>{item.productPrice}</p>
        <p>Stock: {item.productQuantity}</p>
        <div className={styles.quantityContainer}>
          <h4>Quantity:</h4>
          <div className={styles.quantityController}>
            <i
              onClick={() => decreaseQuantity()}
              className="fa-solid fa-minus"
            ></i>
            <p>{quantityCount}</p>
            <i
              onClick={() => increaseQuantity()}
              className="fa-solid fa-plus"
            ></i>
          </div>
        </div>
        <button>Add to Cart</button>
      </div>
    </div>
  );
}

export default ItemCard;
