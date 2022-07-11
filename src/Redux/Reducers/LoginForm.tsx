import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { create } from "domain";

export interface LoginFormState {
  toggleLoginPopUp: Boolean;
}

const initialState: LoginFormState = {
  toggleLoginPopUp: false,
};

export const LoginFromSlice = createSlice({
  name: "LoginForm",
  initialState,
  reducers: {
    openPopUpLoginForm: (state) => {
      state.toggleLoginPopUp = true;
    },
    closePopUpLoginForm: (state) => {
      state.toggleLoginPopUp = false;
    },
  },
});

export const { openPopUpLoginForm, closePopUpLoginForm } =
  LoginFromSlice.actions;
export default LoginFromSlice.reducer;
