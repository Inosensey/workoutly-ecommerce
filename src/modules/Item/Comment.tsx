import Star from "./Star";
import styles from "../../../styles/Item/ReviewComments.module.css";

function Comment({ comment, width }: any) {
  return (
    <div className={styles.comment}>
      <Star width={width} />
      <p>{comment}</p>
    </div>
  );
}

export default Comment;
