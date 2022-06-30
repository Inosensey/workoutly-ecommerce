import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import styles from "../../styles/Nav.module.css";
import Link from "next/link";

function Nav({ onClick }: any) {
  const [isMobile, setIsMobile] = useState(false);
  const [currentWindowHeight, setCurrentWindowHeight] = useState(0);
  const [previousWindowHeight, setPreviousWindowHeight] = useState(0);
  const [isScrolling, setIsScrolling] = useState("NotScrolling");
  const [choices] = useState([
    { LinkName: "Home", LinkIcon: <i className="fa-solid fa-house"></i> },
    {
      LinkName: "Shop",
      LinkIcon: <i className="fa-solid fa-shop"></i>,
    },
    { LinkName: "Features", LinkIcon: <i className="fa-solid fa-star"></i> },

    {
      LinkName: "Sale",
      LinkIcon: <i className="fa-solid fa-strikethrough"></i>,
    },
  ]);

  const handleScroll = () => {
    setCurrentWindowHeight(window.scrollY);
  };
  const CheckScrollHeight = () => {
    setPreviousWindowHeight(currentWindowHeight);
    if (currentWindowHeight === 0) return setIsScrolling("NotScrolling");
    if (currentWindowHeight > previousWindowHeight)
      return setIsScrolling("ScrollDown");

    if (currentWindowHeight < previousWindowHeight)
      return setIsScrolling("ScrollUp");
  };

  useEffect(() => {
    if (window.innerWidth < 770) setIsMobile(true);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    CheckScrollHeight();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentWindowHeight]);

  const OVerLayControl = useAnimation();
  const SideBarControl = useAnimation();
  const UlControl = useAnimation();
  const ListControl = useAnimation();

  const OverlayVariant = {
    hidden: {
      display: "none",
    },
    show: {
      display: "block",
    },
  };
  const SideBarVariant = {
    hidden: {
      x: isMobile ? "-100%" : "0%",
    },
    show: {
      x: "0%",
      transition: {
        type: "tween",
      },
    },
  };
  const UlVariant = {
    hidden: {
      opacity: isMobile ? 0 : 1,
    },
    show: {
      opacity: 1,
      transition: { when: "beforeChildren", staggerChildren: 0.1 },
    },
  };
  const ListVariant = {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 1,
    },
  };

  const SlideInSideBar = () => {
    OVerLayControl.start("show");
    SideBarControl.start("show");
    UlControl.start("show");
    ListControl.start("show");
  };

  const SlideOutSideBar = () => {
    OVerLayControl.start("hidden");
    SideBarControl.start("hidden");
    UlControl.start("hidden");
    ListControl.start("hidden");
  };

  return (
    <div
      className={
        isScrolling === "NotScrolling"
          ? styles.nav
          : isScrolling === "ScrollUp"
          ? `${styles.nav} ${styles.scrollUp}`
          : `${styles.nav} ${styles.scrollDown}`
      }
    >
      <div className={styles.SiteNameContainer}>
        <div className={styles.logoContainer}>
          <Image src="/img/Logo.png" layout="fill" objectFit="contain" alt="" />
        </div>
        <h2>Workoutly</h2>
      </div>
      <motion.div
        className={styles.overlay}
        animate={OVerLayControl}
        variants={OverlayVariant}
        onClick={SlideOutSideBar}
      ></motion.div>
      <motion.div
        variants={SideBarVariant}
        animate={SideBarControl}
        className={styles.choicesContainer}
      >
        <i
          className={`fa-solid fa-xmark ${styles.exitIcon}`}
          onClick={SlideOutSideBar}
        ></i>
        <motion.div
          variants={UlVariant}
          animate={UlControl}
          className={styles.choices}
        >
          {choices.map((choices, index) => (
            <motion.div
              className={styles.choice}
              variants={ListVariant}
              key={Math.random() * 1000}
            >
              {choices.LinkIcon}
              <Link href={`#${choices.LinkName}`}>
                <a>
                  <p onClick={SlideOutSideBar}>{choices.LinkName}</p>
                </a>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
      <div className={styles.buttons}>
        <button onClick={onClick}>Get Started</button>
        <div className={styles.burger} onClick={SlideInSideBar}>
          <div className={styles.lines}></div>
          <div className={styles.lines}></div>
          <div className={styles.lines}></div>
        </div>
      </div>
    </div>
  );
}

export default Nav;
