import { supabase } from "./supabaseClient";

type AddressType = {
  fullName: string;
  phoneNumber: string;
  region: string;
  province: string;
  city: string;
  street: string;
  postalCode: string;
};

const addAddress = async (addressDetails: AddressType, id: string) => {
  try {
    const { data, error } = await supabase.from("address").insert(
      [
        {
          id: id,
          full_name: addressDetails.fullName,
          phone_number: addressDetails.phoneNumber,
          region: addressDetails.region,
          province: addressDetails.province,
          city: addressDetails.city,
          street: addressDetails.street,
          postal_code: addressDetails.postalCode,
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
