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
    toggleLoadingPopUp: (state, action: PayloadAction<LoadingInfoTypes>) => {
      state.ActionName = action.payload.ActionName;
      state.LoadingMessage = action.payload.LoadingMessage;
      state.isLoading = action.payload.isLoading;
    },
  },
});

export const { toggleLoadingPopUp } = LoadingPopUpSlice.actions;
export default LoadingPopUpSlice.reducer;
