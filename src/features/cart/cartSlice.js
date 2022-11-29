import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  cartItems: [],
  amount: 0,
  total: 0,
  isLoading: true,
};

const url = "https://course-api.com/react-useReducer-cart-project";

export const getCartItems = createAsyncThunk("cart/getCartItems", async () => {
  try {
    const resp = await axios(url);
    return resp.data;
  } catch (err) {
    return err.response();
  }
});

// return fetch(url)
//   .then((resp) => resp.json())
//   .catch((err) => console.log(err));

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => {
        return item.id !== itemId;
      });
    },
    increase: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.amount = cartItem.amount + 1;
    },
    decrease: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.amount = cartItem.amount - 1;
    },
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });

      state.amount = amount;
      state.total = total;
    },
  },
  extraReducers: {
    [getCartItems.pending]: (state) => {
      state.isLoading = true;
    },
    [getCartItems.fulfilled]: (state, action) => {
      console.log(action);
      state.isLoading = false;
      state.cartItems = action.payload;
    },
    [getCartItems.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { clearCart, removeItem, increase, decrease, calculateTotals } =
  cartSlice.actions;

// console.log(scartSlice);

export default cartSlice.reducer;

// import cartItems from "../../cartItems";

// const initialState = {
//   cartItems: cartItems,
//   amount: 0,
//   total: 0,
//   isLoading: true,
// };

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     clearCart: (state) => {
//       state.cartItems = [];
//     },
//     removeItem: (state, action) => {
//       const itemId = action.payload;
//       state.cartItems = state.cartItems.filter((item) => {
//         return item.id !== itemId;
//       });
//     },
//     increase: (state, { payload }) => {
//       const cartItem = state.cartItems.find((item) => item.id === payload.id);
//       cartItem.amount = cartItem.amount + 1;
//     },
//     decrease: (state, { payload }) => {
//       const cartItem = state.cartItems.find((item) => item.id === payload.id);
//       cartItem.amount = cartItem.amount - 1;
//     },
//     calculateTotals: (state) => {
//       let amount = 0;
//       let total = 0;
//       state.cartItems.forEach((item) => {
//         amount += item.amount;
//         total += item.amount * item.price;
//       });

//       state.amount = amount;
//       state.total = total;
//     },
//   },
// });

// export const { clearCart, removeItem, increase, decrease, calculateTotals } =
//   cartSlice.actions;

// console.log(cartSlice);

// export default cartSlice.reducer;
