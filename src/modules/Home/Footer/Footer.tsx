import styles from "../../../../styles/Home/Footer.module.css";
import BlogSubscription from "./BlogSubscription";
import Categories from "./Categories";
import Copyright from "./Copyright";
import Help from "./Help";
import Links from "./Links";
import SocialMediaLinks from "./SocialMediaLinks";

function Footer({ CategoryList }: any) {
  return (
    <footer className={styles.container}>
      <div className={styles.footerContentContainer}>
        <SocialMediaLinks />
        <Categories CategoryList={CategoryList} />
        <Links />
        <Help />
        <BlogSubscription />
      </div>
      <Copyright />
    </footer>
  );
}

export default Footer;
