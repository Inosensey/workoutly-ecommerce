import { combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./Cart";
import LoginFormReducer from "./LoginForm";
import AuthReducer from "./Auth";
import LoadingPopUpReducer from "./PopUpLoading";
import NotifPopUpReducer from "./PopUpNotif";
import CheckOutPopUpReducer from "./PopUpCheckOut";
import SidebarLinksReducer from "./SidebarLinks";

const reducers = combineReducers({
  cartReducer: cartReducer,
  loginFormReducer: LoginFormReducer,
  AuthReducer: AuthReducer,
  LoadingPopUpReducer: LoadingPopUpReducer,
  NotifPopUpReducer: NotifPopUpReducer,
  CheckOutPopUpReducer: CheckOutPopUpReducer,
  SidebarLinksReducer: SidebarLinksReducer,
});

export default reducers;
