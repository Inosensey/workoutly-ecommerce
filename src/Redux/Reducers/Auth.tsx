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
  },
});

export const { addSession } = SessionSlice.actions;
export default SessionSlice.reducer;
