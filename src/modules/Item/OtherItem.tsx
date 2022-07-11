import Link from "next/link";
import styles from "../../../styles/Item/OtherItem.module.css";

function OtherItem({ items }: any) {
  return (
    <section className={styles.container}>
      <div className={styles.items}>
        {items.map((item: any) => (
          <Link href={`${item.slug}`} key={item.id}>
            <div className={styles.item}>
              <div className={styles.productPhotoContainer}>
                <img src={item.productPhoto.url} alt="" />
              </div>
              <div className={styles.productInfo}>
                <p className={styles.productName}>
                  <>{item.productName}</>
                </p>
                <p>{item.productPrice}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default OtherItem;
