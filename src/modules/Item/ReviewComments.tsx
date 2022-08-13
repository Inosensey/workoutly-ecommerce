import { useEffect, useState } from "react";
import Comments from "./Comments";
import Ratings from "./Ratings";
import {
  Order,
  Product,
  Profile,
  Review,
} from "../../TypeScript/ReusableTypes";
import { ReviewDetailsType, StarType } from "./Logic/Types";
import GetReviewDetailsLogic from "./Logic/GetReviewDetailsLogic";
import styles from "../../../styles/Item/ReviewComments.module.css";

const DefaultReviewValues = {
  id: "",
  item_id: "",
  review: "",
  rating: 1,
  username: "",
};
const Stars = {
  FiveStar: {
    StarRating: 5,
    StarCount: 0,
  },
  FourStar: {
    StarRating: 4,
    StarCount: 0,
  },
  ThreeStar: {
    StarRating: 3,
    StarCount: 0,
  },
  TwoStar: {
    StarRating: 2,
    StarCount: 0,
  },
  OneStar: {
    StarRating: 1,
    StarCount: 0,
  },
};
const ProfileDetails = {
  id: "",
  personal_details_id: "",
  username: "",
  personal_details: {
    first_name: "",
    middle_name: "",
    last_name: "",
    gender: "",
    birth_date: new Date(),
  },
};

const ReviewComments: React.FC<Product> = (props: Product) => {
  const [order, setOrder] = useState<Order[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState<number>(1);
  const [star, setStar] = useState<StarType>(Stars);
  const [userDetails, setUserDetails] = useState<Profile>(ProfileDetails);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [reviewDetails, setReviewDetails] =
    useState<ReviewDetailsType>(DefaultReviewValues);
  const { getReviewsDetails } = GetReviewDetailsLogic(
    {
      setIsLoading,
      setOrder,
      setReviews,
      setUserDetails,
      setReviewDetails,
      setRating,
      setStar,
    },
    { order, reviews, userDetails, reviewDetails, star }
  );
  useEffect(() => {
    getReviewsDetails(props.id);
  }, []);
  return (
    <div className={styles.container}>
      <Ratings
        rating={rating}
        starRating={star}
        reviewsCount={reviews.length}
      />
      <Comments
        item_id={props.id}
        order={order}
        reviews={reviews}
        profile={userDetails}
        isLoading={isLoading}
        getReviewsDetails={getReviewsDetails}
        reviewDetails={reviewDetails}
        setReviewDetails={setReviewDetails}
      />
    </div>
  );
};

export default ReviewComments;
