import { useState } from "react";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../Redux/Reducers/Cart";
import styles from "../../../styles/Item/Item.module.css";

function ItemCard({ item }: any) {
  const [quantityCount, setQuantityCount] = useState(1);
  const dispatch = useDispatch();

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
        <button
          onClick={() =>
            dispatch(addItemToCart({ itemInfo: item, Quantity: 1 }))
          }
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ItemCard;
