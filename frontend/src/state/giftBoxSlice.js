import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  giftBox: {
    name: null,
    price: 0,
  },
  products: [],
  card: 12,
  message: null,
};

const giftBoxSlice = createSlice({
  name: "giftBox",
  initialState,
  reducers: {
    setGiftBox: (state, action) => {
      state.giftBox = action.payload;
    },
    resetGiftBox: (state) => {
      state.giftBox = initialState.giftBox;
    },
    addOrUpdateProduct: (state, action) => {
      const product = action.payload;
      const existingProduct = state.products.find(
        (item) => item.name === product.name
      );

      if (existingProduct) {
        state.products = state.products.map((item) =>
          item.name === product.name ? product : item
        );
      } else {
        state.products.push(product);
      }
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product.name !== action.payload
      );
    },
    increaseProductQuantity: (state, action) => {
      const product = state.products.find(
        (product) => product.name === action.payload
      );
      product.quantity += 1;
    },
    decreaseProductQuantity: (state, action) => {
      const product = state.products.find(
        (product) => product.name === action.payload
      );
      product.quantity -= 1;
    },
    addCard: (state, action) => {
      state.card = action.payload;
    },
    removeCard: (state) => {
      state.card = null;
    },
    addMessage: (state, action) => {
      state.message = action.payload;
    },
    removeMessage: (state) => {
      state.message = null;
    },
  },
});

export const {
  setGiftBox,
  resetGiftBox,
  addOrUpdateProduct,
  removeProduct,
  increaseProductQuantity,
  decreaseProductQuantity,
  addCard,
  removeCard,
  addMessage,
  removeMessage,
} = giftBoxSlice.actions;
export default giftBoxSlice.reducer;
