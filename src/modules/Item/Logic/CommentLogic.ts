import addReview from "../../../Services/Supabase/addReview";
import { supabase } from "../../../Services/Supabase/supabaseClient";
import { Order, Review } from "../../../TypeScript/ReusableTypes";
import { ReviewDetailsType } from "./Types";

interface IfUserAlreadyCommentedInterface {
    Result: boolean,
    PersonalCommentDetails: Review | undefined
  }

const CommentLogic = () => {
  const user = supabase.auth.user();
    const CheckIfUserHasTheItem = (order: Order[], item_id: string) : boolean => {
        let result:boolean = false 
        if (order.length === 0) return result;
        for (let outer = 0; outer < order.length; outer++) {
            for (let inner = 0; inner < order[outer].item_metadata.length; inner++) {
            if (order[outer].item_metadata[inner].itemInfo.id === item_id) {
                result = true;
            }
            }
        }
        return result
    };
    const CheckIfUserAlreadyCommented = (reviews:Review[]): IfUserAlreadyCommentedInterface => {
        let Response: {Result: boolean, PersonalCommentDetails: any} = {
            Result: false,
            PersonalCommentDetails: {}
        }
        if (reviews.length === 0) Response = {Result: false, PersonalCommentDetails: undefined};
        reviews.map((details: Review) => {
            if (user?.id === details.id) {
                Response = {
                    Result: true,
                    PersonalCommentDetails: details
                }
            }
        });
        return {Result: Response.Result, PersonalCommentDetails: Response.PersonalCommentDetails}
    };
    const addReviewHandler = async (
        reviewDetails: ReviewDetailsType, 
        item_id: string,
        getReviewsDetails:any
        ) => {
            const response = await addReview(reviewDetails);
            if (response?.error === null) return getReviewsDetails(item_id);
    };

    return {
        CheckIfUserHasTheItem,
        CheckIfUserAlreadyCommented,
        addReviewHandler
    }
}

export default CommentLogic;