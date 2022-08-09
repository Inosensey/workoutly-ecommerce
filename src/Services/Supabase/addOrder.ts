import { supabase } from "./supabaseClient";

type OrderDetailsType = {
  id: string;
  fullName: string;
  item: {};
  total_price: number;
  address_id: number;
  status: string;
};

const addOrder = async (orderDetails: OrderDetailsType) => {
  const date = new Date();
  try {
    const { data, error } = await supabase.from("orders").insert(
      [
        {
          id: orderDetails.id,
          full_name: orderDetails.fullName,
          item_metadata: orderDetails.item,
          total_price: orderDetails.total_price,
          address_id: orderDetails.address_id,
          status: orderDetails.status,
          purchased_at: date.toLocaleDateString(),
        },
      ],
      { returning: "minimal" }
    );
    return {
      data,
      error,
    };
  } catch (error) {
    console.log({ Error: error });
  }
};

export default addOrder;
