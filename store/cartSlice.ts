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
    addToCart: (state, action: PayloadAction<CartItem>) => {
      // Yahan hum ID ke saath selected options ko bhi check karenge 
      // taake agar same item different options ke sath ho to alag dikhe
      const existingItem = state.items.find(
        (i) => String(i.id) === String(action.payload.id)
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },

    // --- NAYA REDUCER: Quantity update karne ke liye ---
    updateQuantity: (state, action: PayloadAction<{ id: string | number; change: number }>) => {
      const item = state.items.find((i) => String(i.id) === String(action.payload.id));
      if (item) {
        const newQuantity = item.quantity + action.payload.change;
        if (newQuantity > 0) {
          item.quantity = newQuantity;
        }
      }
    },

    removeFromCart: (state, action: PayloadAction<string | number>) => {
      state.items = state.items.filter(
        (i) => String(i.id) !== String(action.payload)
      );
    },
    clearCart: (state) => {
      state.items = [];
    },

    // ✅ Yeh wapas add karein
    setCartItems: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
    },
  },
});

export const { addToCart, removeFromCart, clearCart, setCartItems, updateQuantity } = cartSlice.actions;

export default cartSlice.reducer;
