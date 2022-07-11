import { useAnimation, motion } from "framer-motion";
import { useState } from "react";
import styles from "../../../styles/Home/LimitedItem.module.css";
import Timer from "./Timer/Timer";

function LimitedItem({ LimitedItems }: any) {
  const [position, setPosition] = useState(0);

  // Framer Motion
  const SliderControl = useAnimation();
  const nextSlide = async () => {
    const lastItem = -(LimitedItems.length - 1) * 100;
    if (position === lastItem) return null;
    SliderControl.start("Next");
    setPosition(position - 100);
  };
  const prevSlide = async () => {
    if (position === 0) return null;
    SliderControl.start("Prev");
    setPosition(position + 100);
  };

  const SlideVariant = {
    Next: (currentSlide: any) => ({
      x: `${currentSlide - 100}%`,
      transition: {
        type: "tween",
      },
    }),
    Prev: (currentSlide: any) => ({
      x: `${currentSlide + 100}%`,
      transition: {
        type: "tween",
      },
    }),
  };

  return (
    <section className={styles.container}>
      <div className={styles.arrowNavContainer}>
        <i
          onClick={prevSlide}
          className={
            position === 0
              ? `fa-solid fa-circle-arrow-left ${styles.disableArrow}`
              : `fa-solid fa-circle-arrow-left ${styles.activeArrow}`
          }
        ></i>
        <i
          onClick={nextSlide}
          className={
            position === -(LimitedItems.length - 1) * 100
              ? `fa-solid fa-circle-arrow-right ${styles.disableArrow}`
              : `fa-solid fa-circle-arrow-right ${styles.activeArrow}`
          }
        ></i>
      </div>
      {LimitedItems.map((item: any) => (
        <motion.div
          animate={SliderControl}
          variants={SlideVariant}
          layoutId={item.id}
          custom={position}
          key={item.id}
          className={styles.itemContainer}
        >
          <div className={styles.itemCoverPhotoContainer}>
            <img src={item.coverPhoto.url} alt="" />
            <h2>{item.coverPhotoTitle}</h2>
          </div>
          <div className={styles.itemInfoContainer}>
            <div className={styles.productImageContainer}>
              <img src={item.productPhoto.url} />
            </div>
            <div className={styles.productInfoContainer}>
              <p>{item.productName}</p>
              <p>{item.productPrice}$</p>
              <button>Add to Cart</button>
            </div>
            <Timer />
          </div>
        </motion.div>
      ))}
    </section>
  );
}

export default LimitedItem;
