import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type LoadingInfoTypes = {
  ActionName: String;
  LoadingMessage: String;
  isLoading: Boolean;
};

export interface LoadingInfoState {
  ActionName: String;
  LoadingMessage: String;
  isLoading: Boolean;
}

const initialState: LoadingInfoState = {
  ActionName: "",
  LoadingMessage: "",
  isLoading: false,
};

export const LoadingPopUpSlice = createSlice({
  name: "LoadingPopUp",
  initialState,
  reducers: {
    showLoadingPopUp: (state, action: PayloadAction<LoadingInfoTypes>) => {
      state.ActionName = action.payload.ActionName;
      state.LoadingMessage = action.payload.LoadingMessage;
      state.isLoading = action.payload.isLoading;
    },
    hideLoadingPopUp: (state) => {
      state.ActionName = "";
      state.LoadingMessage = "";
      state.isLoading = false;
    },
  },
});

export const { showLoadingPopUp, hideLoadingPopUp } = LoadingPopUpSlice.actions;
export default LoadingPopUpSlice.reducer;
