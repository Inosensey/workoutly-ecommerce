import Image from "next/image";
import Link from "next/link";
import styles from "../../../styles/Home/Featured.module.css";
import { ItemsType } from "./Logic/Types";

interface Props {
  FeaturedItems: ItemsType[];
}

export default function FeaturedItems({ FeaturedItems }: Props) {
  return (
    <section className={styles.container}>
      <h1>Featured Equipments</h1>
      <div className={styles.featuredItemContainer}>
        {FeaturedItems.map((item: ItemsType) => (
          <div key={item.id} className={styles.featuredItem}>
            <div className={styles.productPhotoContainer}>
              <div className={styles.overlay}>
                <Link href={`/Item/${item.slug}`}>
                  <button>View</button>
                </Link>
              </div>
              <div className={styles.productPhoto}>
                <Image
                  src={item.productPhoto.url}
                  alt={item.productName}
                  objectFit="contain"
                  layout="fill"
                />
              </div>
            </div>
            <div className={styles.productInfoContainer}>
              <p>{item.productPrice}$</p>
              <p className={styles.productName}>{item.productName}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
