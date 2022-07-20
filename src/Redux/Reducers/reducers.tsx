import { combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./Cart";
import LoginFormReducer from "./LoginForm";
import AuthReducer from "./Auth";
import LoadingPopUpReducer from "./PopUpLoading";

const reducers = combineReducers({
  cartReducer: cartReducer,
  loginFormReducer: LoginFormReducer,
  AuthReducer: AuthReducer,
  LoadingPopUpReducer: LoadingPopUpReducer,
});

export default reducers;
