import { supabase } from "./supabaseClient";

const getReviews = async (itemId: string) => {
  try {
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .eq("item_id", itemId);
    return {
      data,
      error,
    };
  } catch (error) {
    console.log({ Error: error });
  }
};

export default getReviews;
