import { supabase } from "./supabaseClient";

const getReviews = async () => {
  try {
    const { data, error } = await supabase.from("reviews").select("*");
    return {
      data,
      error,
    };
  } catch (error) {
    console.log({ Error: error });
  }
};

export default getReviews;
