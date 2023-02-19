import { createSlice } from '@reduxjs/toolkit';

// const addItem = createAction('cart/addItem')


const initialState = {
  items: [],
  totalAmount: 0,
  cartIsShown: false
}

const cartSlice = createSlice({
  name: "cart-slice",
  initialState,
  reducers: {
    addItem (state, { payload }) {
        const updatedTotalAmount =
          state.totalAmount + payload.price * payload.amount;
        const existingCartItemIndex = state.items.findIndex(
          (item) => payload.id === item.id
        );
    
        const existingCartItem = state.items[existingCartItemIndex];
        let updatedItems;
    
        if (existingCartItem) {
          const updatedItem = {
            ...existingCartItem,
            amount: existingCartItem.amount + payload.amount,
          };
          updatedItems = [...state.items];
          updatedItems[existingCartItemIndex] = updatedItem;
        } else {
          updatedItems = state.items.concat(payload);
        }
        return {
          items: updatedItems,
          totalAmount: updatedTotalAmount,
        };
    },

    // removeItem is remove item from state
    removeItem (state, { payload }) {
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === payload
      );
      const existingCartItem = state.items[existingCartItemIndex];
      let updatedItems;
      let updatedTotalAmount = state.totalAmount - existingCartItem.price;
      if (existingCartItem.amount === 1) {
        updatedItems = state.items.filter((item) => item.id !== payload);
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
    },

    showCart (state) {
      return {
        ...state,
        cartIsShown: true,
      }
    },

    hideCart (state) {
      return {
        ...state,
        cartIsShown: false,
      }
    }
  }
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;

