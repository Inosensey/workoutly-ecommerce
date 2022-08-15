import { AddressDetailsType } from "../../modules/UserPanel/Logic/Types";
import { supabase } from "./supabaseClient";



const addAddress = async (addressDetails: AddressDetailsType, id: string) => {
  try {
    const { data, error } = await supabase.from("address").insert(
      [
        {
          id: id,
          full_name: addressDetails.full_name,
          phone_number: addressDetails.phone_number,
          region: addressDetails.region,
          province: addressDetails.province,
          city: addressDetails.city,
          street: addressDetails.street,
          postal_code: addressDetails.postal_code,
        },
      ],
      { returning: "minimal" }
    );
    return { data, error };
  } catch (error) {
    console.log({ Error: error });
  }
};

export default addAddress;
