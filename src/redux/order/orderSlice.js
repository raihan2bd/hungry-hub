import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchOrders = createAsyncThunk('order/fetch', async ({token, orderData}) => {
  try {
    const response = await axios.post("/orders.json?auth=" + token, orderData)
    console.log(response.data);
  } catch(err) {
    console.log(err);
  }
});

const initialState = []

const orderSlice = createSlice({
  name: "order-slice",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      return [...action.payload]
    })
  }
})

export default orderSlice.reducer;