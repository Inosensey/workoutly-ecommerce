import { supabase } from "./supabaseClient";

const getAddresses = async () => {
  try {
    const { data, error } = await supabase.from("address").select("*");
    return {
      data,
      error,
    };
  } catch (error) {
    console.log({ Error: error });
  }
};

export default getAddresses;
