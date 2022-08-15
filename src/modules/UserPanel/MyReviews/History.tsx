import Link from "next/link";
import styles from "../../../../styles/UserPanel/ToBeReviewed.module.css";
import { Item } from "../../../TypeScript/ReusableTypes";

interface Props {
  Items: Item[];
}

function History({ Items }: Props) {
  return (
    <div className={styles.container}>
      {Items.length === 0 ? (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontFamily: "League Spartan",
            fontSize: "1.5rem",
            color: "#ff7777",
          }}
        >
          <p>You don't have any order that has been reviewed</p>
        </div>
      ) : (
        <>
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
                  <h3 className={styles.itemReviewBtn}>Write a review</h3>
                </Link>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default History;
