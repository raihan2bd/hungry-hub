import { createSlice } from '@reduxjs/toolkit';

// const addItem = createAction('cart/addItem')


const initialState = {
  items: [],
  totalAmount: 0
}

const cartSlice = createSlice({
  name: "cart-slice",
  initialState,
  reducers: {
    addItem (state, action) {
        const updatedTotalAmount =
          state.totalAmount + action.item.price * action.item.amount;
        const existingCartItemIndex = state.items.findIndex(
          (item) => action.item.id === item.id
        );
    
        const existingCartItem = state.items[existingCartItemIndex];
        let updatedItems;
    
        if (existingCartItem) {
          const updatedItem = {
            ...existingCartItem,
            amount: existingCartItem.amount + action.item.amount,
          };
          updatedItems = [...state.items];
          updatedItems[existingCartItemIndex] = updatedItem;
        } else {
          updatedItems = state.items.concat(action.item);
        }
        return {
          items: updatedItems,
          totalAmount: updatedTotalAmount,
        };
    },

    // removeItem is remove item from state
    removeItem (state, action) {
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.id
      );
      const existingCartItem = state.items[existingCartItemIndex];
      let updatedItems;
      let updatedTotalAmount = state.totalAmount - existingCartItem.price;
      if (existingCartItem.amount === 1) {
        updatedItems = state.items.filter((item) => item.id !== action.id);
      } else {
        updatedItems = [...state.items];
        const updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount - 1,
        };
        updatedItems[existingCartItemIndex] = updatedItem;
      }
  
      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    }
  }
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;

