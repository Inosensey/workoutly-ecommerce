import { useState } from "react";
import { motion, useAnimation } from "framer-motion";
import styles from "../../../styles/Home/Hero.module.css";

function Hero({ CollectionBanners }: any) {
  const [slideDirection, setSlideDirection] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);

  // Framer Motion
  let SliderVariant = {
    slide: (slideDirection: string) =>
      slideDirection === "right" ? { x: `${0 - 100}%` } : { x: `${0 + 100}%` },
  };

  //   Slide function
  const nextSlide = () => {
    setSlideDirection("right");
  };
  const prevSlide = () => {
    setSlideDirection("left");
  };

  return (
    <section className={styles.container}>
      <div className={styles.arrowNavContainer}>
        <i onClick={prevSlide} className="fa-solid fa-circle-arrow-left"></i>
        <i onClick={nextSlide} className="fa-solid fa-circle-arrow-right"></i>
      </div>
      <motion.div
        variants={SliderVariant}
        animate="slide"
        className={styles.bannersContainer}
      >
        {CollectionBanners.map((collection: any) => (
          <div
            className={styles.bannerInfoContainer}
            style={{
              backgroundImage: `url(${collection.collectionCoverPhoto.url})`,
            }}
            key={Math.random() * 10000}
          >
            <p>{collection.collectionName}</p>
            <h1>New Arrivals</h1>
            <button>Shop now</button>
          </div>
        ))}
      </motion.div>
    </section>
  );
}

export default Hero;
