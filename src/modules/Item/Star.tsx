import styles from "../../../styles/Item/ReviewComments.module.css";

interface props {
  width: number;
}

function Star({ width }: props) {
  return (
    <div className={styles.starsOuter}>
      <div className={styles.starsInner} style={{ width: `${width}%` }}></div>
    </div>
  );
}

export default Star;
