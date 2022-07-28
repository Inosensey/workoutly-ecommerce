import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./Reducers/Cart";
import LoginFormReducer from "./Reducers/LoginForm";
import AuthReducer from "./Reducers/Auth";
import LoadingPopUpReducer from "./Reducers/PopUpLoading";
import NotifPopUpReducer from "./Reducers/PopUpNotif";
import CheckOutPopUpReducer from "./Reducers/PopUpCheckOut";
import SidebarLinksReducer from "./Reducers/SidebarLinks";
export const store = configureStore({
  reducer: {
    cartReducer: cartReducer,
    loginFormReducer: LoginFormReducer,
    AuthReducer: AuthReducer,
    LoadingPopUpReducer: LoadingPopUpReducer,
    NotifPopUpReducer: NotifPopUpReducer,
    CheckOutPopUpReducer: CheckOutPopUpReducer,
    SidebarLinksReducer: SidebarLinksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
