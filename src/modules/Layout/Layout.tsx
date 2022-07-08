import ShoppingCart from "../ShoppingCart/ShoppingCart";

function Layout({ children }: any) {
  return (
    <>
      <ShoppingCart />
      {children}
    </>
  );
}

export default Layout;
