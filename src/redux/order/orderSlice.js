import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseApiUrl = 'https://food-order-ed00a-default-rtdb.asia-southeast1.firebasedatabase.app';

export const fetchOrders = createAsyncThunk('fetch/order', async({token, userId}) => {
  const response = await axios.get(`${baseApiUrl}/orders.json?auth=${token}&orderBy="userId"&equalTo="${userId}"`)
  const fetchedOrders = [];
  for (let key in response.data) {
    fetchedOrders.push({
      ...response.data[key],
      id: key,
    })
  }
  return fetchedOrders;
})

const initialState = {
  orders: [],
}

const orderSlice = createSlice({
  name: "order-slice",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      const updatedState = {...state, orders: [...action.payload]}
      return updatedState;
    })
  }
})

export default orderSlice.reducer;