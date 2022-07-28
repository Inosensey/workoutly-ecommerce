import { createSlice } from "@reduxjs/toolkit";

export interface PopUpCheckOutState {
  toggleCheckOutPopUp: Boolean;
}

const initialState: PopUpCheckOutState = {
  toggleCheckOutPopUp: false,
};

export const PopUpCheckOutSlice = createSlice({
  name: "PopUpCheckOut",
  initialState,
  reducers: {
    openPopUpCheckOut: (state) => {
      document.body.style.overflow = "hidden";
      state.toggleCheckOutPopUp = true;
    },
    closePopUpCheckOut: (state) => {
      document.body.style.overflow = "auto";
      state.toggleCheckOutPopUp = false;
    },
  },
});

export const { openPopUpCheckOut, closePopUpCheckOut } =
  PopUpCheckOutSlice.actions;
export default PopUpCheckOutSlice.reducer;
