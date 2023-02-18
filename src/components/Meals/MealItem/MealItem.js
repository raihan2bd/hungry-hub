import React from 'react';

import { cartActions } from '../../../redux/cart/cartSlice';
import MealItemFrom from './MealItemForm';
import classes from './MealItem.module.css';
import { useDispatch } from 'react-redux';

const MealItem = (props) => {
  const dispatch = useDispatch();

  const addToCartHandler = (amount) => {
    dispatch(cartActions.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    }));
  };
  const price = `$${props.price.toFixed(2)}`;
  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemFrom onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
