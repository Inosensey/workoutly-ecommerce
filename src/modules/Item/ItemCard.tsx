import { useDispatch } from "react-redux";
import { addItemToCart } from "../../Redux/Reducers/Cart";
import { motion } from "framer-motion";
import styles from "../../../styles/Item/Item.module.css";
import { Item, Product } from "../../TypeScript/ReusableTypes";

const ItemCard: React.FC<Product> = (props: Product) => {
  const dispatch = useDispatch();
  return (
    <div className={styles.itemContainer}>
      <div className={styles.productPhotoContainer}>
        <img src={props.productPhoto.url} alt="" />
      </div>
      <div className={styles.productInfoContainer}>
        <h3 className={styles.itemName}>{props.productName}</h3>
        <div className={styles.descriptionContainer}>
          <h4>Details:</h4>
          <p>{props.description.text}</p>
        </div>
        <p className={styles.itemPrice}>{props.productPrice}$</p>
        <p>Stock: {props.productQuantity}</p>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() =>
            dispatch(addItemToCart({ itemInfo: props, Quantity: 1 }))
          }
        >
          Add to Cart
        </motion.button>
      </div>
    </div>
  );
};

export default ItemCard;
