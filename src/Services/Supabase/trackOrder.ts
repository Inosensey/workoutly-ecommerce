import { supabase } from "./supabaseClient";

const trackOrder = async (trackNumber: string) => {
  try {
    let { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("track_id", trackNumber);
    return {
      data,
      error,
    };
  } catch (error) {
    console.log({ Error: error });
  }
};

export default trackOrder;
