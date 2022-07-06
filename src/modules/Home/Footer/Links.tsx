import styles from "../../../../styles/Home/Footer.module.css";

function Links() {
  return (
    <div className={styles.linksContainer}>
      <h3>Links</h3>
      <div className={styles.linkNames}>
        <p>Home</p>
        <p>Shop</p>
        <p>Features</p>
        <p>Sale</p>
      </div>
    </div>
  );
}

export default Links;
