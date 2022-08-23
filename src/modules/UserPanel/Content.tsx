import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import Header from "./Header";
import MyAccountContents from "./MyAccountContents";
import MyOrdersContents from "./MyOrdersContents";
import MyReviewsContents from "./MyReviewsContents";

function Content(props: { setShowSidebar: any }) {
  const Link = useSelector(
    (state: RootState) => state.SidebarLinksReducer.CurrentLink
  );
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <Header setShowSidebar={props.setShowSidebar} CurrentLink={Link} />
      {Link === "My Account" && <MyAccountContents />}
      {Link === "My Orders" && <MyOrdersContents />}
      {Link === "My Reviews" && <MyReviewsContents />}
    </div>
  );
}

export default Content;
