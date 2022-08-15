import Link from "next/link";
import styles from "../../../../styles/UserPanel/ToBeReviewed.module.css";
import { Item } from "../../../TypeScript/ReusableTypes";

interface Props {
  Items: Item[];
}

function History({ Items }: Props) {
  return (
    <div className={styles.container}>
      {Items.map((details: Item) => (
        <div className={styles.itemInfoContainer} key={details.itemInfo.id}>
          <div className={styles.itemImage}>
            <img src={details.itemInfo.productPhoto.url} alt="" />
          </div>
          <div className={styles.itemInfo}>
            <h3>{details.itemInfo.productName}</h3>
            <p className={styles.description}>
              {details.itemInfo.description.text}
            </p>
            <p>Price: {details.itemInfo.productPrice}$</p>
            <Link href={`Item/${details.itemInfo.slug}`}>
              <h3 className={styles.itemReviewBtn}>View Review</h3>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default History;
