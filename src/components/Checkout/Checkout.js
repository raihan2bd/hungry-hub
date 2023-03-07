import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import classes from './Checkout.module.css';
const Checkout = () => {
  const { items, totalAmount } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  useEffect(() => {
    if (items <= 0) {
      navigate('/', { replace: true });
    }
  }, [items, navigate]);
  return (
    <div className={classes.container}>
      <div className={classes.cart_summary}>
        <h2> Cart summary</h2>
        <ul className={classes.cart_items}>
          {items.map((item) => (
            <li key={item.id} className={classes.cart_item}>
              <h4>{item.name}</h4>
              <span className={classes.amount}>x {item.amount}</span>
              <p className={classes.cart_price}>{item.price}</p>
            </li>
          ))}
        </ul>
        <p className={classes.cart_total_price}>Total Price: <span>{totalAmount.toFixed(2)}</span></p>
      </div>
      <div className={classes.checkout_form_section}>
      <form className={classes.checkout_form}>
        <h2>Checkout Form</h2>
        <fieldset className={classes.form_group}>
        <input type="text" placeholder="Enter your full name here.." />
        <input type="text" placeholder="Enter your phone number here.." />
        <input type="text" placeholder="Enter your country name here" />
        <input type="text" placeholder="Enter your post code here" />
        <input type="text" placeholder="Enter your Street/Address here" />
        <button type="submit">Order</button>
        </fieldset>
      </form>
      </div>
    </div>
  );
};

export default Checkout;
