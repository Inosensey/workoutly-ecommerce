import Link from "next/link";
import styles from "../../../styles/Collection/Items.module.css";

function Items({ Items }: any) {
  return (
    <div className={styles.container}>
      <div className={styles.itemsContainer}>
        {Items.map((item: any) => (
          <div className={styles.items} key={item.id}>
            <div className={styles.productPhotoContainer}>
              <img src={item.productPhoto.url} />
            </div>
            <div className={styles.productInfoContainer}>
              <p>Name: {item.productName}</p>
              <p>Price: {item.productPrice}</p>
              <p>Stock: {item.productQuantity}</p>
              <Link href={`../Item/${item.slug}`}>
                <button>View</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Items;
