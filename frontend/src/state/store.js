import { configureStore } from "@reduxjs/toolkit";
import giftBoxReducer from "./giftBoxSlice";

export const store = configureStore({
  reducer: {
    giftBox: giftBoxReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
