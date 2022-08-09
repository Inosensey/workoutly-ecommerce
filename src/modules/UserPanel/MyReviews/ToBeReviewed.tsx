import Link from "next/link";
import styles from "../../../../styles/UserPanel/ToBeReviewed.module.css";

type ItemInfo = {
  id: string;
  productName: string;
  productPrice: number;
  productPhoto: productPhoto;
  description: description;
  slug: string;
};
type productPhoto = {
  url: string;
};
type description = {
  text: string;
};
type Item = {
  Quality: number;
  itemInfo: ItemInfo;
};
interface Props {
  Items: Array<Item>;
}
function ToBeReviewed({ Items }: Props) {
  console.log(Items);
  return (
    <div className={styles.container}>
      {Items.map((details) => (
        <div className={styles.itemInfoContainer} key={details.itemInfo.id}>
          <div className={styles.itemImage}>
            <img src={details.itemInfo.productPhoto.url} alt="" />
          </div>
          <div className={styles.itemInfo}>
            <h3>{details.itemInfo.productName}</h3>
            <p className={styles.description}>
              {details.itemInfo.description.text}
            </p>
            <p>{details.itemInfo.productPrice}</p>
            <Link href={`Item/${details.itemInfo.slug}`}>
              <h3 className={styles.itemReviewBtn}>Write a review</h3>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ToBeReviewed;