import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/authApi";
import cartReducer from "./cartSlice";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    cart: cartReducer, // ✅ add your cart slice here
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
