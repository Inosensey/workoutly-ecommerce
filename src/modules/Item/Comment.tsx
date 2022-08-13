import Star from "./Star";
import styles from "../../../styles/Item/ReviewComments.module.css";

interface Props {
  comment: string;
  width: number;
}

function Comment({ comment, width }: Props) {
  return (
    <div className={styles.comment}>
      <Star width={width} />
      <p>{comment}</p>
    </div>
  );
}

export default Comment;
