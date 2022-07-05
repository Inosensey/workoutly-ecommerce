import styles from "../../../styles/Home/LimitedItem.module.css";
import Timer from "./Timer/Timer";

function LimitedItem({ LimitedItems }: any) {
  return (
    <section className={styles.container}>
      {LimitedItems.map((item: any) => (
        <div key={item.id} className={styles.itemContainer}>
          <div className={styles.itemCoverPhotoContainer}>
            <img src={item.coverPhoto.url} alt="" />
            <h2>{item.coverPhotoTitle}</h2>
          </div>
          <div className={styles.itemInfoContainer}>
            <div className={styles.productImageContainer}>
              <img src={item.productPhoto.url} />
            </div>
            <div className={styles.productInfoContainer}>
              <p>{item.productName}</p>
              <p>{item.productPrice}</p>
              <button>Add to Cart</button>
            </div>
            <Timer />
          </div>
        </div>
      ))}
    </section>
  );
}

export default LimitedItem;
