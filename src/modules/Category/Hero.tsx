import styles from "../../../styles/Category/Hero.module.css";
import { CategoryType } from "../../TypeScript/ReusableTypes";

interface Props {
  category: CategoryType[];
}

function Hero({ category }: Props) {
  return (
    <section
      className={styles.container}
      style={{
        backgroundImage: `url(${category[0].categoryCoverPhoto.url})`,
      }}
    >
      <div className={styles.bannerInfoContainer}>
        <h1>{category[0].categoryName}</h1>
      </div>
    </section>
  );
}

export default Hero;
