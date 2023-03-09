import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth/authSlice';
import cartSlice from './cart/cartSlice';
import foodsSlice from './foods/foodsSlice';
import orderSlice from './order/orderSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    cart: cartSlice,
    orders: orderSlice,
    foods: foodsSlice,
  }
});

export default store;