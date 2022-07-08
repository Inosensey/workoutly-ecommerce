import styles from "../../../styles/ShoppingCart/ShoppingCart.module.css";

function CartItem() {
  return (
    <div className={styles.cartItems}>
      <div className={styles.itemContainer}>
        <div className={styles.itemPhotoContainer}>
          <img src="/img/mini_high_bar_1488961913_30692.png" alt="" />
        </div>
        <div className={styles.itemInfoContainer}>
          <p>item name</p>
          <p>item price</p>
          <div className={styles.itemActionContainer}>
            <div className={styles.quantityContainer}>
              <div className={styles.quantityController}>
                <i className="fa-solid fa-minus"></i>
                <p>0</p>
                <i className="fa-solid fa-plus"></i>
              </div>
            </div>
            <i className="fa-solid fa-circle-xmark"></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
