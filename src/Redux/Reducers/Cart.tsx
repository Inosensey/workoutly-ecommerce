import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type CartItemTypes = {
  itemInfo: Object;
  Quantity: Number;
};
type QuantityActionTypes = {
  itemInfo: Object;
  ActionType: String;
};
type PriceTypes = {
  totalItems: Number;
  totalPrice: Number;
};

export interface CounterState {
  toggleCart: Boolean;
  cartItem: Array<Object>;
  price: Object;
}

const initialState: CounterState = {
  toggleCart: false,
  cartItem: [],
  price: {},
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
    addItemToCart: (state, action: PayloadAction<CartItemTypes>) => {
      const { itemInfo } = action.payload;
      const ExistingItem: any = state.cartItem.find(
        (item: Object) => item.itemInfo.id === itemInfo.id
      );
      if (ExistingItem !== undefined) {
        ExistingItem.Quantity += 1;
      } else {
        state.cartItem.push(action.payload);
      }
    },
    removeItemFromCart: (state, action: PayloadAction<String>) => {
      state.cartItem = state.cartItem.filter(
        (item: any) => item.itemInfo.id !== action.payload
      );
    },
    adjustItemQuantity: (state, action: PayloadAction<QuantityActionTypes>) => {
      const { itemInfo, ActionType } = action.payload;
      const ExistingItem: any = state.cartItem.find(
        (item: Object) => item.itemInfo.id === itemInfo.id
      );
      if (ActionType === "Increment") ExistingItem.Quantity += 1;
      if (ActionType === "Decrement" && ExistingItem.Quantity !== 1)
        ExistingItem.Quantity -= 1;
    },
    calculatePrice: (state) => {
      let items = 0;
      let price = 0;
      state.cartItem.map((item: any) => {
        items = items + item.Quantity;
        price = item.itemInfo.productPrice * item.Quantity;
      });
      state.price.totalPrice = price;
      state.price.totalItem = items;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  openCart,
  closeCart,
  addItemToCart,
  removeItemFromCart,
  adjustItemQuantity,
  calculatePrice,
} = cartSlice.actions;

export default cartSlice.reducer;
