import { supabase } from "./supabaseClient";

export const getAddresses = async () => {
  try {
    const { data, error } = await supabase
      .from("address")
      .select("*")
      .order("updated_at", { ascending: false });
    return {
      data,
      error,
    };
  } catch (error) {
    console.log({ Error: error });
  }
};

export const getSpecificAddress = async (addressId: number) => {
  try {
    const { data, error } = await supabase
      .from("address")
      .select("*")
      .eq("address_id", addressId);
    return {
      data,
      error,
    };
  } catch (error) {
    console.log({ Error: error });
  }
};
