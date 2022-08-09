import { supabase } from "./supabaseClient";

const deleteAddress = async (addressId: number) => {
  try {
    const { data, error } = await supabase
      .from("address")
      .delete()
      .eq("address_id", addressId);
    return {
      data,
      error,
    };
  } catch (error) {
    console.log({ Error: error });
  }
};

export default deleteAddress;
