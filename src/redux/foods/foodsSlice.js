import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


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
  }
});

export default foodsSlice.reducer;