import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

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
      document.body.style.overflow = "hidden";
      state.toggleLoginPopUp = true;
    },
    closePopUpLoginForm: (state) => {
      document.body.style.overflow = "auto";
      state.toggleLoginPopUp = false;
    },
  },
});

export const { openPopUpLoginForm, closePopUpLoginForm } =
  LoginFromSlice.actions;
export default LoginFromSlice.reducer;
