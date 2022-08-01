import { useEffect, useState } from "react";
import styles from "../../../styles/Item/ReviewComments.module.css";
import getOrders from "../../Services/Supabase/getOrders";

function Comments({ item }: any) {
  console.log(item);
  const [orders, setOrders] = useState<any[]>([]);
  const [userHastItem, setUserHasItem] = useState(false);
  useEffect(() => {
    getOrderHandler();
  }, []);
  useEffect(() => {
    CheckIfUserHasTheItem();
  }, [orders]);
  const getOrderHandler = async () => {
    const response: any = await getOrders();
    setOrders(response?.data);
  };
  const CheckIfUserHasTheItem = () => {
    if (orders.length === 0) return;
    for (let outer = 0; outer < orders.length; outer++) {
      for (let inner = 0; inner < orders[outer].item_metadata.length; inner++) {
        if (orders[outer].item_metadata[inner].itemInfo.id === item.id) {
          setUserHasItem(true);
        }
      }
    }
  };

  return (
    <div className={styles.commentContainer}>
      <div className={styles.commentHeader}>
        <h3>Product Reviews</h3>
      </div>
      <div className={styles.comments}>
        <h2>No reviews yet</h2>
      </div>
    </div>
  );
}

export default Comments;
