import { useEffect, useRef, useState } from "react";
import { supabase } from "../../Services/Supabase/supabaseClient";
import addReview from "../../Services/Supabase/addReview";
import styles from "../../../styles/Item/ReviewComments.module.css";
import PersonalComment from "./PersonalComment";
import Comment from "./Comment";

function Comments({
  item,
  order,
  reviews,
  profile,
  isLoading,
  getReviewsDetails,
  reviewDetails,
  setReviewDetails,
}: any) {
  const [userHastItem, setUserHasItem] = useState(false);
  const [userAlreadyCommented, setUserAlreadyCommented] = useState(false);
  const [personalComment, setPersonalComment] = useState({});
  const [commentList, setCommentList] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const user = supabase.auth.user();

  useEffect(() => {
    CheckIfUserHasTheItem();
    CheckIfUserAlreadyCommented();
    setCommentList(reviews.filter((details: any) => details.id !== user?.id));
  }, [order]);
  const CheckIfUserHasTheItem = () => {
    if (order.length === 0) return;
    for (let outer = 0; outer < order.length; outer++) {
      for (let inner = 0; inner < order[outer].item_metadata.length; inner++) {
        if (order[outer].item_metadata[inner].itemInfo.id === item.id) {
          setUserHasItem(true);
        }
      }
    }
  };
  const addReviewHandler = async () => {
    const response = await addReview(reviewDetails);
    if (response?.error === null) return getReviewsDetails();
  };
  const CheckIfUserAlreadyCommented = () => {
    if (reviews.length === 0) return;
    reviews.map((details: any) => {
      if (user?.id === details.id) {
        setUserAlreadyCommented(true);
        setPersonalComment(details);
      }
    });
  };
  return (
    <div className={styles.commentContainer}>
      <div className={styles.commentHeader}>
        <h3>Product Reviews</h3>
      </div>
      <div className={styles.comments}>
        {userHastItem &&
          !userAlreadyCommented &&
          (showInput ? (
            <div className={styles.inputContainer}>
              <form>
                <div className={styles.inputController}>
                  <h3>{profile[0].username}</h3>
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
                </div>
                <div className={styles.btnContainer}>
                  <button
                    className={styles.cancel}
                    onClick={() => setShowInput(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className={styles.submit}
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      addReviewHandler();
                    }}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <button
              onClick={() => setShowInput(true)}
              style={{
                padding: "0.4rem",
                border: "none",
                backgroundColor: "#f2f2f2",
                color: "#000",
                cursor: "pointer",
              }}
            >
              Leave a comment
            </button>
          ))}
        {isLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#ff7777",
              width: "100%",
              height: "100%",
            }}
          >
            <h2>Loading</h2>
          </div>
        ) : reviews.length === 0 ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#ff7777",
              width: "100%",
              height: "100%",
            }}
          >
            <h2>No reviews yet</h2>
          </div>
        ) : (
          <div className={styles.commentListContainer}>
            {reviews.map(
              (details: any) =>
                details.id === user?.id && (
                  <PersonalComment
                    profile={profile}
                    comment={personalComment}
                    getReviewsDetails={getReviewsDetails}
                    reviewDetails={reviewDetails}
                    setReviewDetails={setReviewDetails}
                  />
                )
            )}

            <div className={styles.commentList}>
              {commentList.map((details: any) => (
                <div className={styles.inputController} key={details.review_id}>
                  <h3>{details.username}</h3>
                  <Comment
                    comment={details.review}
                    width={Math.round((((details.rating / 5) * 100) / 10) * 10)}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Comments;
