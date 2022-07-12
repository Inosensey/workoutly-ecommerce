import styles from "../../../styles/Item/ReviewComments.module.css";

function Comments() {
  return (
    <div className={styles.commentContainer}>
      <div className={styles.commentHeader}>
        <h3>Product Reviews</h3>
      </div>
      <div className={styles.comments}>
        <h2>No reviews yet</h2>
      </div>
    </div>
  );
}

export default Comments;
