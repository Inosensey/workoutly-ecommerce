import styles from "../../../styles/Home/Featured.module.css";

export default function FeaturedItems({ FeaturedItems }: any) {
  return (
    <section className={styles.container}>
      <h1>Featured Equipments</h1>
      <div className={styles.featuredItemContainer}>
        {FeaturedItems.map((item: any) => (
          <div key={item.id} className={styles.featuredItem}>
            <div className={styles.productPhotoContainer}>
              <div className={styles.overlay}>
                <button>View</button>
              </div>
              <img src={item.productPhoto.url} alt="" />
            </div>
            <div className={styles.productInfoContainer}>
              <p>{item.productPrice}</p>
              <p className={styles.productName}>{item.productName}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
