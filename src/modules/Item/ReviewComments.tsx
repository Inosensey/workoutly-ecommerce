import styles from "../../../styles/Item/ReviewComments.module.css";
import Comments from "./Comments";
import Ratings from "./Ratings";

interface Props {
  rating: number;
  item: any;
}

function ReviewComments({ rating, item }: Props) {
  return (
    <div className={styles.container}>
      <Ratings rating={rating} />
      <Comments item={item} />
    </div>
  );
}

export default ReviewComments;
