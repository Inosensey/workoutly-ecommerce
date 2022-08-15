import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Item } from "../../TypeScript/ReusableTypes";

type QuantityActionTypes = {
  itemInfo: Item;
  ActionType: String;
};

interface PriceTypes {
  totalItems: Number;
  totalPrice: Number;
}
export interface CartState {
  toggleCart: Boolean;
  cartItem: Array<Item>;
  price: PriceTypes;
}

const initialState: CartState = {
  toggleCart: false,
  cartItem: [],
  price: {
    totalItems: 0,
    totalPrice: 0,
  },
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    openCart: (state) => {
      document.body.style.overflow = "hidden";
      state.toggleCart = true;
    },
    closeCart: (state) => {
      document.body.style.overflow = "auto";
      state.toggleCart = false;
    },
    addItemToCart: (state, action: PayloadAction<Item>) => {
      let ExistingItem: Item | undefined = state.cartItem.find(
        (item: Item) => item.itemInfo.id === action.payload.itemInfo.id
      );
      if (
        ExistingItem !== undefined &&
        action.payload.itemInfo?.productQuantity &&
        action.payload.itemInfo.productQuantity > ExistingItem.Quantity
      ) {
        ExistingItem.Quantity += 1;
      }
      if (ExistingItem === undefined) {
        state.cartItem.push(action.payload);
      }
    },
    removeItemFromCart: (state, action: PayloadAction<String>) => {
      state.cartItem = state.cartItem.filter(
        (item: Item) => item.itemInfo.id !== action.payload
      );
    },
    adjustItemQuantity: (state, action: PayloadAction<QuantityActionTypes>) => {
      const { itemInfo, ActionType }: QuantityActionTypes = action.payload;
      const ExistingItem: Item | undefined = state.cartItem.find(
        (item) => item.itemInfo.id === itemInfo.itemInfo.id
      );
      if (typeof ExistingItem === undefined) return;
      if (
        ActionType === "Increment" &&
        ExistingItem!.itemInfo.productQuantity! > ExistingItem!.Quantity
      )
        ExistingItem!.Quantity += 1;
      if (ActionType === "Decrement" && ExistingItem!.Quantity !== 1)
        ExistingItem!.Quantity -= 1;
    },
    removeAllItemFromCart: (state) => {
      state.cartItem = [];
    },
    calculatePrice: (state) => {
      let items = 0;
      let price = 0;
      let totalPrice = 0;
      state.cartItem.map((item: Item) => {
        items = items + item.Quantity;
        price = item.itemInfo.productPrice * item.Quantity;
        totalPrice = totalPrice + price;
      });
      state.price.totalPrice = parseFloat(totalPrice.toFixed(2));
      state.price.totalItems = items;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  openCart,
  closeCart,
  addItemToCart,
  removeItemFromCart,
  removeAllItemFromCart,
  adjustItemQuantity,
  calculatePrice,
} = cartSlice.actions;

export default cartSlice.reducer;
