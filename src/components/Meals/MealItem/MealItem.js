import React from 'react';

import { cartActions } from '../../../redux/cart/cartSlice';
import MealItemFrom from './MealItemForm';
import classes from './MealItem.module.css';
import { useDispatch } from 'react-redux';

const MealItem = (props) => {
  const dispatch = useDispatch();

  const addToCartHandler = (amount) => {
    dispatch(
      cartActions.addItem({
        id: props.id,
        name: props.name,
        amount: amount,
        price: props.price,
      })
    );
  };
  const price = `$${props.price.toFixed(2)}`;
  return (
    <li className={classes.food}>
      <div className={classes.food_thamb}>
        <img className={classes.food_img} src={props.img} alt={props.name} />
      </div>
      <div className={classes.food_info}>
        <h3>{props.name}</h3>
        <div className={classes.price}>{price}</div>
      </div>
      <div className={classes.add_to_cart}>
        <MealItemFrom onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
