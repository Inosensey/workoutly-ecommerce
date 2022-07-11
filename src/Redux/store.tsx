import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./Reducers/Cart";
import LoginFormReducer from "./Reducers/LoginForm";
export const store = configureStore({
  reducer: {
    cartReducer: cartReducer,
    loginFormReducer: LoginFormReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
