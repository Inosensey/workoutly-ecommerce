import getOrders from "../../../Services/Supabase/getOrders";
import getProfile from "../../../Services/Supabase/getProfile";
import getReviews from "../../../Services/Supabase/getReviews";
import { Order, Profile, Review } from "../../../TypeScript/ReusableTypes";
import { ReviewDetailsType, ReviewSetStates, ReviewState, StarType } from "./Types";


const ItemLogic = (
        setState:ReviewSetStates, 
        state:ReviewState<Order, Review, Profile, ReviewDetailsType> 
    ) => {
        const getReviewsDetails = async (item_id:string) => {
            setState.setIsLoading(true);
            let [order, reviews, profile] = await Promise.all([
                getOrders(),
                getReviews(item_id),
                getProfile()
            ])
            checkIfAUserIsLoggedIn(profile?.Data, item_id);
            setState.setOrder(order!.data);
            setState.setReviews(reviews!.data);
            getRating(reviews?.data!);
            CountStars(reviews?.data!);
            setState.setIsLoading(false);
        }
        const checkIfAUserIsLoggedIn = (profile:any, item_id:string) => {
          if(profile.length !== 0) {  
            setState.setUserDetails(profile);
            setState.setReviewDetails({
            ...state.reviewDetails,
            id: profile[0].id,
            item_id: item_id,
            username: profile[0].username,
            });
          }
        }
        const getRating = (reviews: Review[]) => {
            let rating:number = 0;
            let totalRating:number = 0;
            if (reviews.length !== 0) {
              reviews.map((details: Review) => (rating += details.rating));
              totalRating = (rating / (reviews.length * 5)) * 5;
            }
            setState.setRating(totalRating)
        };
        const CountStars = (reviews: Review[]) => {
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
            setState.setStar((prev: StarType) => ({
              OneStar: {
                ...prev.OneStar,
                StarCount: count.OneStar,
              },
              TwoStar: {
                ...prev.TwoStar,
                StarCount: count.TwoStar,
              },
              ThreeStar: {
                ...prev.ThreeStar,
                StarCount: count.ThreeStar,
              },
              FourStar: {
                ...prev.FourStar,
                StarCount: count.FourStar,
              },
              FiveStar: {
                ...prev.FiveStar,
                StarCount: count.FiveStar,
              },
            }));
          };

        return {
            getReviewsDetails
        }
}

export default ItemLogic;