import styles from "../../../styles/Item/ReviewComments.module.css";
import Comments from "./Comments";
import Ratings from "./Ratings";

interface Props {
  rating: number;
}

function ReviewComments({ rating }: Props) {
  return (
    <div className={styles.container}>
      <Ratings rating={rating} />
      <Comments />
    </div>
  );
}

export default ReviewComments;
