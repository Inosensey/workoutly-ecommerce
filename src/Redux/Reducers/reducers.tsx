import { combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./Cart";
import LoginFormReducer from "./LoginForm";
import AuthReducer from "./Auth";

const reducers = combineReducers({
  cartReducer: cartReducer,
  loginFormReducer: LoginFormReducer,
  AuthReducer: AuthReducer,
});

export default reducers;
