import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type NotifInfoTypes = {
  NotifType: string;
  NotifName: String;
  NotifMessage: String;
  NotifAction: any;
  show: Boolean;
};

export interface NotifInfoState {
  NotifType: string;
  NotifName: String;
  NotifMessage: String;
  NotifAction: any;
  show: Boolean;
}

const initialState: NotifInfoState = {
  NotifType: "",
  NotifName: "",
  NotifMessage: "",
  NotifAction: "",
  show: false,
};

export const NotifPopSlice = createSlice({
  name: "NotifPopUp",
  initialState,
  reducers: {
    showNotifPopUp: (state, action: PayloadAction<NotifInfoTypes>) => {
      state.NotifType = action.payload.NotifType;
      state.NotifName = action.payload.NotifName;
      state.NotifMessage = action.payload.NotifMessage;
      state.NotifAction = action.payload.NotifAction;
      state.show = action.payload.show;
    },
    hideNotifPopUp: (state) => {
      state.NotifType = "";
      state.NotifName = "";
      state.NotifMessage = "";
      state.show = false;
    },
  },
});

export const { showNotifPopUp, hideNotifPopUp } = NotifPopSlice.actions;
export default NotifPopSlice.reducer;
