import { AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import ShoppingCart from "../ShoppingCart/ShoppingCart";
import { RootState } from "../../Redux/store";
import FormContainer from "../Login/FormContainer";
import LoadingPopUp from "../../common/LoadingPopUp";
import Checkout from "../Checkout/Checkout";
import NotifPopUp from "../../common/NotifPopUp";
import { supabase } from "../../Services/Supabase/supabaseClient";
import { useEffect } from "react";

function Layout({ children }: any) {
  useEffect(() => {
    const session: any = supabase.auth.session() || {};
    supabase.auth.refreshSession();
    supabase.auth.api.refreshAccessToken(session?.refresh_token);
  }, []);
  const TogglePopUpLoginForm = useSelector(
    (state: RootState) => state.loginFormReducer.toggleLoginPopUp
  );
  const toggleCart = useSelector(
    (state: RootState) => state.cartReducer.toggleCart
  );
  const toggleCheckOutPopUp = useSelector(
    (state: RootState) => state.CheckOutPopUpReducer.toggleCheckOutPopUp
  );
  const toggleLoadingPopUp =
    useSelector((state: RootState) => state.LoadingPopUpReducer) || {};
  const toggleNotifPopUp =
    useSelector((state: RootState) => state.NotifPopUpReducer) || {};

  useEffect(() => {
    const sessions = supabase.auth.session();

    // configure the auth state listener
    // if the auth state changes the session will be updated
    // and a POST request will be made to the /api/auth route
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log(event);
        console.log(session);
      }
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  return (
    <>
      {toggleCheckOutPopUp && <Checkout />}
      {toggleNotifPopUp.show && <NotifPopUp />}
      {toggleLoadingPopUp.isLoading && <LoadingPopUp />}
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
