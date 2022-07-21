import { supabase } from "./supabaseClient";

const getPersonalDetails = async (id: string) => {
  try {
    let { data: personal_details, error } = await supabase
      .from("personal_details")
      .select("*")
      .eq("id", id);
    const response = {
      Data: personal_details,
      Error: error,
    };
    return response;
  } catch (error: any) {
    console.log({ Error: error.message });
  }
};

export default getPersonalDetails;
