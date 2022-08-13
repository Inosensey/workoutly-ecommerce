import { supabase } from "./supabaseClient";

const getProfile = async () => {
  try {
    let { data: personal_details, error } = await supabase
      .from("profiles")
      .select("*, personal_details(first_name, middle_name, last_name, gender, birth_date)");
    const response = {
      Data: personal_details,
      Error: error,
    };
    return response;
  } catch (error) {
    console.log({ Error: error });
  }
};

export default getProfile;
