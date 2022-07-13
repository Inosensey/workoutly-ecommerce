import { AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import ShoppingCart from "../ShoppingCart/ShoppingCart";
import { RootState } from "../../Redux/store";
import FormContainer from "../Login/FormContainer";

function Layout({ children }: any) {
  const TogglePopUpLoginForm = useSelector(
    (state: RootState) => state.loginFormReducer.toggleLoginPopUp
  );
  const toggleCart = useSelector(
    (state: RootState) => state.cartReducer.toggleCart
  );

  return (
    <>
      <AnimatePresence
        initial={false}
        exitBeforeEnter={true}
        onExitComplete={() => null}
      >
        {toggleCart && <ShoppingCart />}
      </AnimatePresence>
      <AnimatePresence
        initial={false}
        exitBeforeEnter={true}
        onExitComplete={() => null}
      >
        {TogglePopUpLoginForm && <FormContainer />}
      </AnimatePresence>
      {children}
    </>
  );
}

export default Layout;
