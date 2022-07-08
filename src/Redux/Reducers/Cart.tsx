import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
  toggleCart: Boolean;
  cartItem: Array<Object>;
}

const initialState: CounterState = {
  toggleCart: false,
  cartItem: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    openCart: (state) => {
      state.toggleCart = true;
    },
    closeCart: (state) => {
      state.toggleCart = false;
    },
    addItemToCart: (state, action: PayloadAction<Object>) => {
      state.cartItem.push(action.payload);
    },
    removeItemFromCart: (state, action: PayloadAction<String>) => {
      state.cartItem.filter((item: any) => item.id !== action);
    },
  },
});

// Action creators are generated for each case reducer function
export const { openCart, closeCart, addItemToCart, removeItemFromCart } =
  cartSlice.actions;

export default cartSlice.reducer;
