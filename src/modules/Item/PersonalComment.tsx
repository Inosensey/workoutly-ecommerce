import { useRef, useState } from "react";
import updateReview from "../../Services/Supabase/updateReview";
import Comment from "./Comment";
import styles from "../../../styles/Item/ReviewComments.module.css";

function PersonalComment({
  profile,
  reviewDetails,
  getReviewsDetails,
  setReviewDetails,
  comment,
}: any) {
  const [isEditing, setIsEditing] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const updateReviewHandler = async () => {
    const response = await updateReview(reviewDetails, comment.review_id);
    if (response?.error === null) {
      getReviewsDetails();
      setIsEditing(false);
      return;
    }
    console.log(response?.error);
  };

  return (
    <div className={styles.personalCommentContainer}>
      <h2>Your review</h2>
      <div className={styles.inputContainer}>
        <div className={styles.inputController}>
          <h3>{profile[0].username}</h3>
          {isEditing ? (
            <>
              <div className={styles.inputRating}>
                <h3>Rating</h3>
                <select
                  onChange={(e) =>
                    setReviewDetails({
                      ...reviewDetails,
                      rating: Number(e.target.value),
                    })
                  }
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </select>
              </div>
              <textarea
                name="review"
                value={reviewDetails.review}
                rows={1}
                ref={textAreaRef}
                onKeyDown={(e) => {
                  textAreaRef.current!.style.height = "inherit";
                  textAreaRef.current!.style.height = `${
                    textAreaRef.current!.scrollHeight
                  }px`;
                }}
                onChange={(e) => {
                  setReviewDetails({
                    ...reviewDetails,
                    review: e.target.value,
                  });
                }}
                maxLength={350}
              />
            </>
          ) : (
            <Comment
              comment={comment.review}
              width={Math.round((((comment.rating / 5) * 100) / 10) * 10)}
            />
          )}
        </div>
        <div className={styles.btnContainer}>
          {isEditing ? (
            <>
              <button
                className={styles.cancel}
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
              <button
                className={styles.submit}
                onClick={(e) => {
                  updateReviewHandler();
                }}
              >
                Submit
              </button>
            </>
          ) : (
            <button
              className={styles.edit}
              onClick={() => {
                setIsEditing(true);
                setReviewDetails({
                  ...reviewDetails,
                  rating: comment.rating,
                  review: comment.review,
                });
              }}
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default PersonalComment;
