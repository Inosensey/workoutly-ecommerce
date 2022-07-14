import Header from "./Header";
import MyAccountContents from "./MyAccountContents";

function Content() {
  return (
    <div style={{ width: "80%", height: "100vh" }}>
      <Header />
      <MyAccountContents />
    </div>
  );
}

export default Content;
