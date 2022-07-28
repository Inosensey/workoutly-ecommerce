import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type NotifInfoTypes = {
  NotifName: String;
  LoadingMessage: String;
  show: Boolean;
};

export interface NotifInfoState {
  NotifName: String;
  LoadingMessage: String;
  show: Boolean;
}

const initialState: NotifInfoState = {
  NotifName: "",
  LoadingMessage: "",
  show: false,
};

export const NotifPopSlice = createSlice({
  name: "NotifPopUp",
  initialState,
  reducers: {
    toggleNotifPopUp: (state, action: PayloadAction<NotifInfoTypes>) => {
      state.NotifName = action.payload.NotifName;
      state.LoadingMessage = action.payload.LoadingMessage;
      state.show = action.payload.show;
    },
  },
});

export const { toggleNotifPopUp } = NotifPopSlice.actions;
export default NotifPopSlice.reducer;
