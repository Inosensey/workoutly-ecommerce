import styles from "../../../../styles/Home/Footer.module.css";

function Help() {
  return (
    <div className={styles.helpsContainer}>
      <h3>Help</h3>
      <div className={styles.helpNames}>
        <p>Track Order</p>
        <p>Returns</p>
        <p>Shipping</p>
        <p>FAQ</p>
      </div>
    </div>
  );
}

export default Help;
