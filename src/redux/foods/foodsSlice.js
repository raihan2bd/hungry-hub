import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = 'https://food-order-ed00a-default-rtdb.asia-southeast1.firebasedatabase.app'

export const fetchFoods = createAsyncThunk('foods/fetch', async (data, {rejectWithValue}) => {
  try {
    const response = await axios.get(`${baseUrl}/${data}.json`)
    const fetchedFoods = [];
    for(let key in response.data) {
      fetchedFoods.push({
        ...response.data[key],
        id: key
      })
    }
    return fetchedFoods;
  } catch (err) {
    rejectWithValue(err.message)
  }
})

const initialState = {
  foods: [],
  isLoading: false,
  error: null,
}

const foodsSlice = createSlice({
  name: 'food-slice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFoods.pending, (state) => {
      return {
        ...state,
        foods: [],
        isLoading: true,
        error: null
      }
    });

    builder.addCase(fetchFoods.fulfilled, (state, {payload}) => {
      return {
        ...state,
        foods: [...payload],
        isLoading: false,
        error: null
      }
    });

    builder.addCase(fetchFoods.rejected, (state, {payload}) => {
      return {
        ...state,
        foods: [],
        isLoading: false,
        error: payload|| "Internal server error!"
      }
    });
  }
});

export default foodsSlice.reducer;
