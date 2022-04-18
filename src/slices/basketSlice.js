import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,

  reducers: {
    addToBasket: (state, action) => {
      const check = state.items.find((item) => item.id === action.payload.id);
      if (check) {
        let data = state.items;
        let index = data.find((e) => e.id === action.payload.id);
        index.qty = index.qty + 1;
        index.totalPrice = index.price * index.qty;
      } else {
        state.items = [...state.items, action.payload];
        let index = state.items.find((e) => e.id === action.payload.id);
        index.totalPrice = index.price * index.qty;
      }
    },
    removeFromBasket: (state, action) => {
      const index = state.items.findIndex(
        (basketItem) => basketItem.id === action.payload.id
      );
      let newBasket = [...state.items];

      if (index >= 0) {
        //item exist
        newBasket.splice(index, 1);
        state.items = newBasket;
      } else {
        console.warn(
          `Cant remove product(id: ${action.payload.id}) as its not present in the Basket`
        );
      }
    },
    increaseProduct: (state, action) => {
      const check = state.items.find((item) => item.id === action.payload.id);

      if (check) {
        let data = state.items;
        let index = data.find((e) => e.id === action.payload.id);
        index.qty = index.qty + 1;
        index.totalPrice = index.price * index.qty;
      }
    },
    decrementProduct: (state, action) => {
      const check = state.items.find((item) => item.id === action.payload.id);

      if (check) {
        let data = state.items;
        let product = data.find((e) => e.id === action.payload.id);

        if (product.qty > 0) {
          product.qty = product.qty - 1;
          product.totalPrice = product.price * product.qty;
        }
      }
    },
  },
});

export const {
  addToBasket,
  decrementProduct,
  increaseProduct,
  removeFromBasket,
} = basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice

export const selectItems = (state) => state.basket.items;
export const selectTotal = (state) =>
  state.basket.items.reduce((total, item) => total + item.totalPrice, 0);
export default basketSlice.reducer;
