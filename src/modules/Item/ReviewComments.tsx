import { useEffect, useState } from "react";
import getOrders from "../../Services/Supabase/getOrders";
import getProfile from "../../Services/Supabase/getProfile";
import getReviews from "../../Services/Supabase/getReviews";
import Comments from "./Comments";
import Ratings from "./Ratings";
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

function ReviewComments({ item }: any) {
  const [order, setOrder] = useState<any[]>([]);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(1);
  const [star, setStar] = useState(Stars);
  const [userDetails, setUserDetails] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [reviewDetails, setReviewDetails] = useState(DefaultReviewValues);
  useEffect(() => {
    getReviewsDetails();
  }, []);
  const getReviewsDetails = async () => {
    setIsLoading(true);
    let [order, profile, reviews]: any = await Promise.all([
      getOrders(),
      getProfile(),
      getReviews(item.id),
    ]);
    console.log(profile);
    setOrder(order.data);
    setReviews(reviews.data);
    setUserDetails(profile.Data);
    setReviewDetails({
      ...reviewDetails,
      id: profile.Data[0].id,
      item_id: item.id,
      username: profile.Data[0].username,
    });
    getRating(reviews.data);
    CountStars(reviews.data);
    setIsLoading(false);
  };
  const getRating = (reviews: any) => {
    let rating = 0;
    let totalRating = 0;
    if (reviews.length !== 0) {
      reviews.map((details: any) => (rating += details.rating));
      totalRating = (rating / (reviews.length * 5)) * 5;
    }
    setRating(totalRating);
  };
  const CountStars = (reviews: any) => {
    let count = {
      OneStar: 0,
      TwoStar: 0,
      ThreeStar: 0,
      FourStar: 0,
      FiveStar: 0,
    };
    for (let i = 0; i < reviews.length; i++) {
      if (reviews[i].rating === 1) count.OneStar += 1;
      if (reviews[i].rating === 2) count.TwoStar += 1;
      if (reviews[i].rating === 3) count.ThreeStar += 1;
      if (reviews[i].rating === 4) count.FourStar += 1;
      if (reviews[i].rating === 5) count.FiveStar += 1;
    }
    setStar((prev) => ({
      OneStar: {
        ...prev.OneStar,
        StarCount: count.OneStar,
      },
      TwoStar: {
        ...prev.OneStar,
        StarCount: count.TwoStar,
      },
      ThreeStar: {
        ...prev.OneStar,
        StarCount: count.ThreeStar,
      },
      FourStar: {
        ...prev.OneStar,
        StarCount: count.FourStar,
      },
      FiveStar: {
        ...prev.OneStar,
        StarCount: count.FiveStar,
      },
    }));
  };
  return (
    <div className={styles.container}>
      <Ratings
        rating={rating}
        starRating={star}
        reviewsCount={reviews.length}
      />
      <Comments
        item={item}
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
}

export default ReviewComments;
