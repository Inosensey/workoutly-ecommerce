import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import Header from "./Header";
import MyAccountContents from "./MyAccountContents";
import MyOrders from "./MyOrdersContents";

function Content() {
  const Link = useSelector(
    (state: RootState) => state.SidebarLinksReducer.CurrentLink
  );
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <Header CurrentLink={Link} />
      {Link === "My Account" && <MyAccountContents />}
      {Link === "My Orders" && <MyOrders />}
    </div>
  );
}

export default Content;
