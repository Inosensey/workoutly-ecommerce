import { AnimatePresence } from "framer-motion";
import PopUpLogin from "../Login/PopUpLogin";
import { useSelector } from "react-redux";
import ShoppingCart from "../ShoppingCart/ShoppingCart";
import { RootState } from "../../Redux/store";

function Layout({ children }: any) {
  const TogglePopUpLoginForm = useSelector(
    (state: RootState) => state.loginFormReducer.toggleLoginPopUp
  );

  return (
    <>
      <ShoppingCart />
      <AnimatePresence
        initial={false}
        exitBeforeEnter={true}
        onExitComplete={() => null}
      >
        {TogglePopUpLoginForm && <PopUpLogin />}
      </AnimatePresence>
      {children}
    </>
  );
}

export default Layout;
