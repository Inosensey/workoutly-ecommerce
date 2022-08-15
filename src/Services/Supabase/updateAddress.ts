import { AddressDetailsType } from "../../modules/UserPanel/Logic/Types";
import { supabase } from "./supabaseClient";

const updateAddress = async (addressDetails: AddressDetailsType) => {
  try {
    const { data, error } = await supabase
      .from("address")
      .update({
        full_name: addressDetails.full_name,
        phone_number: addressDetails.phone_number,
        region: addressDetails.region,
        province: addressDetails.province,
        city: addressDetails.city,
        street: addressDetails.street,
        postal_code: addressDetails.postal_code,
        updated_at: new Date().toISOString(),
      })
      .eq("address_id", addressDetails.address_id);
    return {
      data,
      error,
    };
  } catch (error) {
    console.log({ Error: error });
  }
};

export default updateAddress;
