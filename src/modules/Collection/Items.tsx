import Link from "next/link";
import { ItemsType } from "./Logic/Types";
import styles from "../../../styles/Collection/Items.module.css";

interface Props {
  Items: ItemsType[];
}

function Items({ Items }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.itemsContainer}>
        {Items.map((item: ItemsType) => (
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
