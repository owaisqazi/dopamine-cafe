import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  description: string;
  options: {
    id: number;
    name: string;
    price_modifier: number;
  }[];
  optionsKey: string; // 🔑 IMPORTANT
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // ✅ ADD TO CART (id + optionsKey)
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (i) =>
          String(i.id) === String(action.payload.id) &&
          i.optionsKey === action.payload.optionsKey
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },

    // ✅ UPDATE QUANTITY (id + optionsKey)
    updateQuantity: (
      state,
      action: PayloadAction<{
        id: string | number;
        optionsKey: string;
        change: number;
      }>
    ) => {
      const item = state.items.find(
        (i) =>
          String(i.id) === String(action.payload.id) &&
          i.optionsKey === action.payload.optionsKey
      );

      if (item) {
        const newQuantity = item.quantity + action.payload.change;
        if (newQuantity > 0) {
          item.quantity = newQuantity;
        }
      }
    },

    // ✅ REMOVE ITEM (id + optionsKey)
    removeFromCart: (
      state,
      action: PayloadAction<{ id: string | number; optionsKey: string }>
    ) => {
      state.items = state.items.filter(
        (i) =>
          !(
            String(i.id) === String(action.payload.id) &&
            i.optionsKey === action.payload.optionsKey
          )
      );
    },

    clearCart: (state) => {
      state.items = [];
    },

    setCartItems: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
    },
  },
});

export const {
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
  setCartItems,
} = cartSlice.actions;

export default cartSlice.reducer;
