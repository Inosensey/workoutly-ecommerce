import { useState, useEffect } from "react";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import Link from "next/link";
import { CollectionBannersType } from "../../TypeScript/ReusableTypes";
import styles from "../../../styles/Home/Hero.module.css";

interface Props {
  CollectionBanners: CollectionBannersType[];
}

function Hero({ CollectionBanners }: Props) {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  // Framer Motion
  const SliderControl = useAnimation();
  const BannerInfoControl = useAnimation();

  const nextSlide = async () => {
    const lastItem = -(CollectionBanners.length - 1) * 100;
    if (currentSlide === lastItem) return null;
    await BannerInfoControl.start("exit");
    SliderControl.start("Next");
    setCurrentSlide(currentSlide - 100);
  };
  const prevSlide = async () => {
    if (currentSlide === 0) return null;
    await BannerInfoControl.start("exit");
    SliderControl.start("Prev");
    setCurrentSlide(currentSlide + 100);
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
  const BannerPVariant = {
    initial: {
      y: -100,
      opacity: 0,
    },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: "tween",
        duration: 0.8,
        delay: 0.2,
      },
    },
    exit: {
      y: -100,
      opacity: 0,
      transition: {
        type: "tween",
      },
    },
  };
  const BannerH1Variant = {
    initial: {
      y: 100,
      opacity: 0,
    },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: "tween",
        duration: 0.8,
        delay: 0.8,
      },
    },
    exit: {
      y: 100,
      opacity: 0,
      transition: {
        type: "tween",
      },
    },
  };
  const BannerBtnVariant = {
    initial: {
      opacity: 0,
    },
    show: {
      opacity: 1,
      transition: {
        type: "tween",
        duration: 0.8,
        delay: 1.4,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        type: "tween",
      },
    },
  };

  useEffect(() => {
    BannerInfoControl.start("show");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSlide]);

  return (
    <section className={styles.container}>
      <div className={styles.arrowNavContainer}>
        <i
          onClick={prevSlide}
          className={
            currentSlide === 0
              ? `fa-solid fa-circle-arrow-left ${styles.disableArrow}`
              : `fa-solid fa-circle-arrow-left ${styles.activeArrow}`
          }
        ></i>
        <i
          onClick={nextSlide}
          className={
            currentSlide === -(CollectionBanners.length - 1) * 100
              ? `fa-solid fa-circle-arrow-right ${styles.disableArrow}`
              : `fa-solid fa-circle-arrow-right ${styles.activeArrow}`
          }
        ></i>
      </div>
      <div className={styles.bannersContainer}>
        {CollectionBanners.map((collection: CollectionBannersType) => (
          <motion.div
            key={collection.id}
            layoutId={collection.id}
            custom={currentSlide}
            variants={SlideVariant}
            animate={SliderControl}
            className={`${styles.bannerInfoContainer}`}
            style={{
              backgroundImage: `url(${collection.collectionCoverPhoto.url})`,
            }}
          >
            <motion.p
              variants={BannerPVariant}
              initial="initial"
              animate={BannerInfoControl}
            >
              {collection.collectionName}
            </motion.p>
            <motion.h1
              variants={BannerH1Variant}
              initial="initial"
              animate={BannerInfoControl}
            >
              New Arrivals
            </motion.h1>
            <Link href={`/Collection/${collection.slug}`}>
              <motion.button
                variants={BannerBtnVariant}
                initial="initial"
                animate={BannerInfoControl}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Shop now
              </motion.button>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Hero;
