import { supabase } from "./supabaseClient";

const getProfile = async () => {
  try {
    let { data: personal_details, error } = await supabase
      .from("profiles")
      .select("*, personal_details(*)");
    const response = {
      Data: personal_details,
      Error: error,
    };
    return response;
  } catch (error: any) {
    console.log({ Error: error.message });
  }
};

export default getProfile;
