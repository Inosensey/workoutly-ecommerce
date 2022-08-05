import Star from "./Star";
import styles from "../../../styles/Item/ReviewComments.module.css";

interface Props {
  rating: number;
  starRating: any;
  reviewsCount: number;
}

function Ratings({ rating, starRating, reviewsCount }: Props) {
  const StarPercentage = (rating / 5) * 100;

  return (
    <div className={styles.ratingContainer}>
      <div className={styles.ratings}>
        <h3>
          <>
            {rating}
            <span>/5</span>
          </>
        </h3>
        <Star width={Math.round(StarPercentage / 10) * 10} />
        <p>
          {reviewsCount} {reviewsCount < 2 ? "review" : "reviews"}
        </p>
      </div>
      <div className={styles.starsCounterContainer}>
        <div className={styles.stars}>
          {[5, 4, 3, 2, 1].map((num: number) => (
            <div className={styles.starsOuter} key={num}>
              <div
                className={styles.starsInner}
                style={{
                  width: `${Math.round(((num / 5) * 100) / 10) * 10}%`,
                }}
              ></div>
            </div>
          ))}
        </div>
        <div className={styles.countRatings}>
          <p>
            {starRating.FiveStar.StarCount}{" "}
            {starRating.FiveStar.StarCount < 2 ? "review" : "reviews"}
          </p>
          <p>
            {starRating.FourStar.StarCount}{" "}
            {starRating.FourStar.StarCount < 2 ? "review" : "reviews"}
          </p>
          <p>
            {starRating.ThreeStar.StarCount}{" "}
            {starRating.ThreeStar.StarCount < 2 ? "review" : "reviews"}
          </p>
          <p>
            {starRating.TwoStar.StarCount}{" "}
            {starRating.TwoStar.StarCount < 2 ? "review" : "reviews"}
          </p>
          <p>
            {starRating.OneStar.StarCount}{" "}
            {starRating.OneStar.StarCount < 2 ? "review" : "reviews"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Ratings;
