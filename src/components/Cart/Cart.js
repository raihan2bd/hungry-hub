import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { cartActions } from '../../redux/cart/cartSlice';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';

const Cart = (props) => {
  const cartState = useSelector((state) => state.cart);
  const totalAmount = `$${cartState.totalAmount.toFixed(2)}`;
  const hasItems = cartState.items.length > 0;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItemRemoveHandler = (id) => {
    dispatch(cartActions.removeItem(id));
  };
  const cartItemAddHandler = (item) => {
    dispatch(cartActions.addItem({ ...item, amount: 1 }));
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartState.items.map((item) => {
        return (
          <CartItem
            key={item.id}
            name={item.name}
            amount={item.amount}
            price={item.price}
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
            onAdd={cartItemAddHandler.bind(null, item)}
          />
        );
      })}
    </ul>
  );
  return (
    <Modal onClick={props.onHideCart}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button
          onClick={props.onHideCart}
          type="button"
          className={classes['button--alt']}
        >
          Close
        </button>

        {hasItems && (
          <button onClick={() => {
            navigate('/checkout');
            props.onHideCart();
            }} type="button" className={classes.button}>
            Checkout
          </button>
        )}
      </div>
    </Modal>
  );
};
export default Cart;
