import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "../../../styles/Home/Categories.module.css";

function Categories({ Categories }: any) {
  const [carouselWidth, setCarouselWidth] = useState(0);
  const carousel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCarouselWidth(
      carousel.current.scrollWidth - carousel.current.offsetWidth
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className={styles.container}>
      <h1>Categories</h1>
      <motion.div ref={carousel} className={styles.carousel}>
        <motion.div
          drag="x"
          dragConstraints={{ right: 0, left: -carouselWidth }}
          className={styles.innerCarousel}
        >
          {Categories.map((info: any) => (
            <div
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
