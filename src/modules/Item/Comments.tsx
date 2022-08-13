import { useEffect, useRef, useState } from "react";
import { supabase } from "../../Services/Supabase/supabaseClient";
import addReview from "../../Services/Supabase/addReview";
import PersonalComment from "./PersonalComment";
import Comment from "./Comment";
import { Order, Profile, Review } from "../../TypeScript/ReusableTypes";
import { ReviewDetailsType } from "./Logic/Types";
import CommentLogic from "./Logic/CommentLogic";
import styles from "../../../styles/Item/ReviewComments.module.css";

interface IfUserAlreadyCommentedInterface {
  Result: boolean;
  PersonalCommentDetails: Review | undefined;
}

interface Props {
  item_id: string;
  order: Order[];
  reviews: Review[];
  profile: Profile;
  isLoading: boolean;
  getReviewsDetails: any;
  reviewDetails: ReviewDetailsType;
  setReviewDetails: any;
}

const ReviewDetails = {
  review_id: 0,
  id: "",
  item_id: "",
  review: "",
  created_at: new Date(),
  rating: 0,
  username: "",
};

function Comments({
  item_id,
  order,
  reviews,
  profile,
  isLoading,
  getReviewsDetails,
  reviewDetails,
  setReviewDetails,
}: Props) {
  const [userHastItem, setUserHasItem] = useState<boolean>(false);
  const [userAlreadyCommented, setUserAlreadyCommented] =
    useState<boolean>(false);
  const [personalComment, setPersonalComment] = useState<Review>(ReviewDetails);
  const [commentList, setCommentList] = useState<Review[]>([]);
  const [showInput, setShowInput] = useState<boolean>(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const {
    CheckIfUserAlreadyCommented,
    CheckIfUserHasTheItem,
    addReviewHandler,
  } = CommentLogic();
  const user = supabase.auth.user();

  useEffect(() => {
    GetCommentDetails();
    setCommentList(
      reviews.filter((details: Review) => details.id !== user?.id)
    );
  }, [order]);
  const GetCommentDetails = () => {
    const IfUserAlreadyCommented: IfUserAlreadyCommentedInterface =
      CheckIfUserAlreadyCommented(reviews);
    setUserHasItem(CheckIfUserHasTheItem(order, item_id));
    if (IfUserAlreadyCommented.Result !== false) {
      setUserAlreadyCommented(IfUserAlreadyCommented.Result);
      setPersonalComment(IfUserAlreadyCommented.PersonalCommentDetails!);
    }
  };
  // };
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
                  <h3>{profile.username}</h3>
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
                      addReviewHandler(
                        reviewDetails,
                        item_id,
                        getReviewsDetails
                      );
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
              height: "76%",
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
              height: "76%",
            }}
          >
            <h2>No reviews yet</h2>
          </div>
        ) : (
          <div className={styles.commentListContainer}>
            {reviews.map(
              (details: Review) =>
                details.id === user?.id && (
                  <div key={details.id}>
                    <PersonalComment
                      profile={profile}
                      comment={personalComment}
                      getReviewsDetails={getReviewsDetails}
                      reviewDetails={reviewDetails}
                      setReviewDetails={setReviewDetails}
                    />
                  </div>
                )
            )}

            <div className={styles.commentList}>
              {commentList.map((details: Review) => (
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
