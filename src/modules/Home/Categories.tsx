import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { CategoriesType } from "./Logic/Types";
import styles from "../../../styles/Home/Categories.module.css";

interface Props {
  Categories: CategoriesType[];
}

function Categories({ Categories }: Props) {
  const [carouselWidth, setCarouselWidth] = useState(0);
  const carousel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    CarouselWidthHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const CarouselWidthHandler = () => {
    if (carousel.current !== null) {
      setCarouselWidth(
        carousel.current.scrollWidth - carousel.current.offsetWidth
      );
    }
  };

  return (
    <section className={styles.container}>
      <h1>Categories</h1>
      <motion.div ref={carousel} className={styles.carousel}>
        <motion.div
          drag="x"
          dragConstraints={{ right: 0, left: -carouselWidth }}
          className={styles.innerCarousel}
        >
          {Categories.map((info: CategoriesType) => (
            <div
              key={info.id}
              className={styles.category}
              style={{ backgroundImage: `url(${info.categoryCoverPhoto.url})` }}
            >
              <div className={styles.categoryOverlay}>
                <div className={styles.categoryInfo}>
                  <button>View</button>
                  <p>{info.categoryName} Category</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Categories;
