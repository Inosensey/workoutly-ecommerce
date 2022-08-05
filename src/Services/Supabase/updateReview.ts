import { supabase } from "./supabaseClient";

type DetailsObject = {
    rating: number,
    review: string,
}

const updateReview = async (details:DetailsObject,review_id:number) => {
    try {
        let {data, error} = await supabase.from("reviews").update({
            review: details.review,
            rating: details.rating
        }).eq("review_id", review_id)
        return {
            data,
            error
        }
    } catch (error) {
        console.log({Error: error})
    }
}

export default updateReview