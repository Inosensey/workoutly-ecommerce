import { CategoriesType } from "../Logic/Types";
import BlogSubscription from "./BlogSubscription";
import Categories from "./Categories";
import Copyright from "./Copyright";
import Help from "./Help";
import Links from "./Links";
import SocialMediaLinks from "./SocialMediaLinks";
import styles from "../../../../styles/Home/Footer.module.css";

interface Props {
  CategoryList: CategoriesType[];
}

function Footer({ CategoryList }: Props) {
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
