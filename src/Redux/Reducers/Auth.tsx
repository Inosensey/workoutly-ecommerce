import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface SessionState {
  Session: Object | undefined | null;
}

const initialState: SessionState = {
  Session: {},
};

export const SessionSlice = createSlice({
  name: "SessionSlice",
  initialState,
  reducers: {
    addSession: (state, action: PayloadAction<Object>) => {
      state.Session = action.payload;
    },
    removeSession: (state) => {
      state.Session = {};
    },
  },
});

export const { addSession, removeSession } = SessionSlice.actions;
export default SessionSlice.reducer;
