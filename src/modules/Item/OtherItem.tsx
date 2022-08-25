import Image from "next/image";
import Link from "next/link";
import styles from "../../../styles/Item/OtherItem.module.css";

interface Items {
  id: string;
  productName: string;
  productPrice: number;
  slug: string;
  productPhoto: {
    url: string;
  };
}

const OtherItem = (props: { items: Items[] }) => {
  return (
    <section className={styles.container}>
      <h3>Items you may like</h3>
      <div className={styles.items}>
        {props.items.map((item: Items) => (
          <Link href={`${item.slug}`} key={item.id}>
            <div className={styles.item}>
              <div className={styles.productPhotoContainer}>
                <div className={styles.productPhoto}>
                  <Image
                    src={item.productPhoto.url}
                    alt={item.productName}
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
              </div>
              <div className={styles.productInfo}>
                <p className={styles.productName}>
                  <>{item.productName}</>
                </p>
                <p>{item.productPrice}$</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default OtherItem;
