import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import { openModal } from "../modal/modalSlice";

const url = "https://course-api.com/react-useReducer-cart-project";

const initialState = {
  cartItems: [],
  amount: 4,
  total: 0,
  isLoading: true,
};

// export const getCartItems = createAsyncThunk("cart/getCartItems", () => {
//   return fetch(url)
//     .then((resp) => resp.json())
//     .catch((err) => console.log(err));
// });


export const getCartItems = createAsyncThunk("cart/getCartItems",async (name, thunkAPI) => { //name is an argument if we want to pass some arguments to the functions
 try {
  // console.log(thunkAPI)
  // console.log(thunkAPI.getState())
  // console.log(thunkAPI.rejectWithValue('something went wrong'))

  // thunkAPI.dispatch(openModal())
  const resp = await axios(url)
  return resp.data
 } catch (error) {
  return thunkAPI.rejectWithValue('something went wrong');
 }
});



const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = []; // correct way : behind the scenes it use immer npm

      // return {} //wrong way: it remove  all the initial state

      // return {cartItems: []} //wrong way: it remove all the initial state except the cartItems
    },
    removeItem: (state, action) => {
      const itemId = action?.payload;
      const cartItem = state.cartItems.filter((item) => item.id !== itemId);
      state.cartItems = cartItem;
    },
    increase: (state, action) => {
      const itemId = action?.payload;
      const cartItem = state.cartItems.find((item) => item.id === itemId);
      cartItem.amount = cartItem.amount + 1;
    },
    decrease: (state, action) => {
      const itemId = action?.payload;
      const cartItem = state.cartItems.find((item) => item.id === itemId);
      if (!cartItem.amount) return;
      cartItem.amount = cartItem.amount - 1;
    },
    calculateTotal: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      state.amount = amount;
      state.total = total.toFixed(2);
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

// console.log(cartSlice)

export const { clearCart, removeItem, increase, decrease, calculateTotal } =
  cartSlice.actions;
export default cartSlice.reducer;
