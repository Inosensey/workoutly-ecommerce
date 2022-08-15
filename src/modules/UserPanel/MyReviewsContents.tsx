import { useEffect, useState } from "react";
import Tabs from "./Tabs";
import ToBeReviewed from "./MyReviews/ToBeReviewed";
import History from "./MyReviews/History";
import getOrders from "../../Services/Supabase/getOrders";
import getAllReviews from "../../Services/Supabase/getAllReviews";
import { supabase } from "../../Services/Supabase/supabaseClient";
import { Item, Order, Review } from "../../TypeScript/ReusableTypes";
import styles from "../../../styles/UserPanel/MyReviewsContent.module.css";

function MyReviewsContents() {
  const user = supabase.auth.user();
  const [currentTab, setCurrentTab] = useState<string>("To Be Reviewed");
  const [toBeReviewed, setToBeReviewed] = useState<Item[]>([]);
  const [history, setHistory] = useState<Item[]>([]);
  const [tabList] = useState(["To Be Reviewed", "History"]);

  useEffect(() => {
    getAllDetails();
  }, []);

  const getAllDetails = async () => {
    const [orders, reviews]: any = await Promise.all([
      getOrders(),
      getAllReviews(),
    ]);
    CheckIfItemHasBeenReviews(orders.data, reviews.data);
  };
  const CheckIfItemHasBeenReviews = (orders: Order[], reviews: Review[]) => {
    let historyItemList: Array<Item> = [];
    let toBeReviewedItemList: Array<Item> = [];
    for (let orderIndex = 0; orderIndex < orders.length; orderIndex++) {
      let item = orders[orderIndex].item_metadata;
      for (let itemIndex = 0; itemIndex < item.length; itemIndex++) {
        for (let reviewIndex = 0; reviewIndex < reviews.length; reviewIndex++) {
          if (orders[orderIndex].id === reviews[reviewIndex].id) {
            if (
              orders[orderIndex].id === reviews[reviewIndex].id &&
              item[itemIndex].itemInfo.id === reviews[reviewIndex].item_id
            ) {
              historyItemList.push(item[itemIndex]);
            }
            if (
              orders[orderIndex].id !== reviews[reviewIndex].id &&
              item[itemIndex].itemInfo.id !== reviews[reviewIndex].item_id
            ) {
              toBeReviewedItemList.push(item[itemIndex]);
            }
          }
        }
      }
    }
    setHistory(historyItemList);
    setToBeReviewed(toBeReviewedItemList);
  };

  return (
    <div className={styles.content}>
      <Tabs
        current={currentTab}
        tabList={tabList}
        setCurrentTab={setCurrentTab}
      />
      <div className={styles.contentContainer}>
        {currentTab === "To Be Reviewed" && (
          <ToBeReviewed Items={toBeReviewed} />
        )}
        {currentTab === "History" && <History Items={history} />}
      </div>
    </div>
  );
}

export default MyReviewsContents;
