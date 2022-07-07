import styles from "../../../styles/Collection/Hero.module.css";

function Hero({ CollectionBanner }: any) {
  return (
    <section
      className={styles.container}
      style={{
        backgroundImage: `url(${CollectionBanner[0].collectionCoverPhoto.url})`,
      }}
    >
      <div className={styles.bannerInfoContainer}>
        <h1>{CollectionBanner[0].collectionName}</h1>
        <h2>New Arrivals</h2>
      </div>
    </section>
  );
}

export default Hero;
