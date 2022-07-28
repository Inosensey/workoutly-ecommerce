import styles from "../../../styles/Item/ReviewComments.module.css";

interface Props {
  rating: number;
}

function Ratings({ rating }: Props) {
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
        <div className={styles.starsOuter}>
          <div
            className={styles.starsInner}
            style={{ width: `${Math.round(StarPercentage / 10) * 10}%` }}
          ></div>
        </div>
        <p>0 reviews</p>
      </div>
      <div className={styles.starsCounterContainer}>
        {[4, 3, 2, 1, 0].map((num: number) => (
          <div className={styles.stars} key={num}>
            <div className={styles.starsOuter}>
              <div
                className={styles.starsInner}
                style={{
                  width: `${Math.round((((num + 1) / 5) * 100) / 10) * 10}%`,
                }}
              ></div>
            </div>
            <p>0 reviews</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Ratings;
