import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface LinkState {
  CurrentLink: string;
}

const initialState: LinkState = {
  CurrentLink: "My Account",
};

export const LinkSlice = createSlice({
  name: "LinkSlice",
  initialState,
  reducers: {
    setLink: (state, action: PayloadAction<string>) => {
      state.CurrentLink = action.payload;
    },
  },
});

export const { setLink } = LinkSlice.actions;
export default LinkSlice.reducer;
