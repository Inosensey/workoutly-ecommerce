import { supabase } from "./supabaseClient";

const getOrders = async () => {
  try {
    const { data, error } = await supabase
      .from("orders")
      .select("*, address(region, province, city, street, postal_code)");
    return {
      data,
      error,
    };
  } catch (error) {
    console.log({ Error: error });
  }
};

export default getOrders;
