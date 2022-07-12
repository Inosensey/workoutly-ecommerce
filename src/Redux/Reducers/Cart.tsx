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

interface PriceTypes {
  totalItems: Number;
  totalPrice: Number;
}
export interface CartState {
  toggleCart: Boolean;
  cartItem: Array<Object>;
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
    addItemToCart: (state, action: PayloadAction<CartItemTypes>) => {
      const { itemInfo } = action.payload;
      const ExistingItem: any = state.cartItem.find(
        (item: Object) => item.itemInfo.id === itemInfo.id
      );
      if (
        ExistingItem !== undefined &&
        itemInfo.productQuantity > ExistingItem.Quantity
      ) {
        ExistingItem.Quantity += 1;
      }
      if (ExistingItem === undefined) {
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
      if (
        ActionType === "Increment" &&
        ExistingItem.itemInfo.productQuantity > ExistingItem.Quantity
      )
        ExistingItem.Quantity += 1;
      if (ActionType === "Decrement" && ExistingItem.Quantity !== 1)
        ExistingItem.Quantity -= 1;
    },
    calculatePrice: (state) => {
      let items = 0;
      let price = 0;
      let totalPrice = 0;
      state.cartItem.map((item: any) => {
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
  adjustItemQuantity,
  calculatePrice,
} = cartSlice.actions;

export default cartSlice.reducer;
