import React, { useRef, useState } from 'react';

import Input from '../../UI/Input';
import classes from './FoodItemForm.module.css';

const FoodItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNum = +enteredAmount;
    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNum < 1 ||
      enteredAmountNum > 5
    ) {
      setAmountIsValid(false);
      return;
    }

    props.onAddToCart(enteredAmountNum);
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: 'amount',
          type: 'number',
          min: '1',
          max: '5',
          step: 1,
          defaultValue: 1,
        }}
      />
      <button type="submit">Add</button>
      {!amountIsValid && <p>Please enter a valid amount length (1-5)!</p>}
    </form>
  );
};
export default FoodItemForm;
