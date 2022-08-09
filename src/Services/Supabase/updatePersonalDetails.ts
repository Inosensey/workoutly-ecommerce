import { supabase } from "./supabaseClient";

type PersonalDetails = {
  firstName: string;
  middleName: string;
  lastName: string;
  gender: string;
  birthDate: string;
};

const updatePersonalDetails = async (
  PersonalDetails: PersonalDetails,
  id: string
) => {
  try {
    const { data, error } = await supabase
      .from("personal_details")
      .update({
        first_name: PersonalDetails.firstName,
        middle_name: PersonalDetails.middleName,
        last_name: PersonalDetails.lastName,
        gender: PersonalDetails.gender,
        birth_date: PersonalDetails.birthDate,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);
    return { data, error };
  } catch (error) {
    console.log({ Error: error });
  }
};

export default updatePersonalDetails;
