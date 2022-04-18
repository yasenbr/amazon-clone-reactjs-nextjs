import { createSlice } from "@reduxjs/toolkit";
import Product from "../components/Product";

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
        let position = data.indexOf(index);
        data[position] = { ...data[position] };
        state.items = [...data];
      } else {
        state.items = [...state.items, action.payload];
      }
    },
    removeFromBasket: (state, action) => {
      const index = state.items.findIndex(
        (basketItem) => basketItem.id === action.payload.id
      );
      console.log(index);
      let newBasket = [...state.items];
      console.log(newBasket);

      if (index >= 0) {
        //item exist
        newBasket.splice(index, 1);
        console.log(newBasket);
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
        let position = data.indexOf(index);
        data[position] = { ...data[position] };
        state.items = [...data];
      }
    },
    decrementProduct: (state, action) => {
      const check = state.items.find((item) => item.id === action.payload.id);
      let newBasket = [...state.items];
      console.log("st4", newBasket);

      if (check) {
        let data = state.items;
        let product = data.find((e) => e.id === action.payload.id);

        if (product.qty > 0) {
          product.qty = product.qty - 1;
          product.totalPrice = product.price * product.qty;
          let position = data.indexOf(product);
          data[position] = { ...data[position] };
          state.items = [...data];
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
