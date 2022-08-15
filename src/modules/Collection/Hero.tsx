import styles from "../../../styles/Collection/Hero.module.css";
import { CollectionBannersType } from "./Logic/Types";

interface Props {
  CollectionBanner: CollectionBannersType[];
}

function Hero({ CollectionBanner }: Props) {
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
