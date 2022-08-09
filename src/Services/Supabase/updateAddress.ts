import { supabase } from "./supabaseClient";

type AddressDetails = {
  addressId: number;
  fullName: string;
  phoneNumber: string;
  region: string;
  province: string;
  city: string;
  street: string;
  postalCode: string;
};

const updateAddress = async (addressDetails: AddressDetails) => {
  try {
    const { data, error } = await supabase
      .from("address")
      .update({
        full_name: addressDetails.fullName,
        phone_number: addressDetails.phoneNumber,
        region: addressDetails.region,
        province: addressDetails.province,
        city: addressDetails.city,
        street: addressDetails.street,
        postal_code: addressDetails.postalCode,
        updated_at: new Date().toISOString(),
      })
      .eq("address_id", addressDetails.addressId);
    return {
      data,
      error,
    };
  } catch (error) {
    console.log({ Error: error });
  }
};

export default updateAddress;
