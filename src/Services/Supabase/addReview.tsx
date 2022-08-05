import { supabase } from "./supabaseClient";

interface Props {
  id: string;
  item_id: string;
  review: string;
  rating: number;
}

const addReview = async (reviewDetails: Props) => {
  try {
    const { data, error } = await supabase.from("reviews").insert(
      [
        {
          id: reviewDetails.id,
          item_id: reviewDetails.item_id,
          review: reviewDetails.review,
          rating: reviewDetails.rating,
        },
      ],
      { returning: "minimal" }
    );
    return {
      data,
      error,
    };
  } catch (error) {
    console.log({ Error: error });
  }
};

export default addReview;
