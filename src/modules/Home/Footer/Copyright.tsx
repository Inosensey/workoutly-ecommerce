import Image from "next/image";
import styles from "../../../../styles/Home/Footer.module.css";
function Copyright() {
  return (
    <div className={styles.copyRightContainer}>
      <div className={styles.SiteNameContainer}>
        <div className={styles.logoContainer}>
          <Image
            src="/img/Logo.png"
            objectFit="contain"
            layout="fill"
            alt="logo"
          />
        </div>
        <h2>Workoutly</h2>
      </div>
      <p>Copyright by 2022 Workoutly, Inc</p>
    </div>
  );
}

export default Copyright;
