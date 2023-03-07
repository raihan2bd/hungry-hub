import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import classes from './Checkout.module.css';
import axios from 'axios';
import { cartActions } from '../../redux/cart/cartSlice';
const Checkout = () => {
  const [fullName, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [postCode, setPostCode] = useState('');
  const [address, setAddress] = useState('');
  const [hasError, setHasError] = useState(true);

  const { items, totalAmount } = useSelector((state) => state.cart);
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.userId);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fullnameChangeHandler = (e) => {
    setFullname(e.target.value);
  };
  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };
  const phoneChangeHandler = (e) => {
    setPhone(e.target.value);
  };
  const countryChangeHandler = (e) => {
    setCountry(e.target.value);
  };
  const postCodeChangeHandler = (e) => {
    setPostCode(e.target.value);
  };
  const addressChangeHandler = (e) => {
    setAddress(e.target.value);
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (hasError) {
      return;
    }

    const orderData = {
      Items: items,
      totalAmount: totalAmount,
      customarData: {
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        country: country.trim(),
        postCode: postCode.trim(),
        address: address.trim(),
      },
      userId: userId,
    };
    const baseUrl = `https://food-order-ed00a-default-rtdb.asia-southeast1.firebasedatabase.app`;
    axios
      .post(`${baseUrl}/orders.json?auth=${token}`, orderData)
      .then((response) => {
        // clear cart
        dispatch(cartActions.clearCart());
        navigate('/order', { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (!token) {
      navigate('/auth', { replace: true });
    }
  }, [token, navigate]);

  useEffect(() => {
    if (
      fullName.trim().length > 2 &&
      email.trim().length > 7 &&
      phone.trim().length > 2 &&
      country.trim().length > 2 &&
      postCode.trim().length > 2 &&
      address.trim().length > 2
    ) {
      setHasError(false);
    } else {
      setHasError(true);
    }
  }, [fullName, email, phone, country, postCode, address]);

  let cartContent = (
    <div className={classes.cart_summary} style={{ textAlign: 'center' }}>
      <p>No Cart item found ! Please add a item to your cart!!</p>
      <Link to="/">Back To Home</Link>
    </div>
  );

  if (items.length > 0) {
    cartContent = (
      <>
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
          <p className={classes.cart_total_price}>
            Total Price: <span>{totalAmount.toFixed(2)}</span>
          </p>
        </div>
        <form className={classes.checkout_form} onSubmit={formSubmitHandler}>
          <h2>Checkout Form</h2>
          {hasError && (
            <p className={classes.has_error}>
              All the fields is required and should be at least 3 charcter
              long !!
            </p>
          )}
          <fieldset className={classes.form_group}>
            <div className={classes.form_control}>
              <label htmlFor="fullname">Full Name:</label>
              <input
                type="text"
                name="fullname"
                id="fullname"
                onChange={fullnameChangeHandler}
                placeholder="Enter full name"
                value={fullName}
                required
              />
            </div>
            <div className={classes.form_control}>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={emailChangeHandler}
                placeholder="Enter email"
                value={email}
                required
              />
            </div>
            <div className={classes.form_control}>
              <label htmlFor="phone">Phone:</label>
              <input
                type="text"
                id="phone"
                name="phone"
                onChange={phoneChangeHandler}
                placeholder="Enter phone number"
                value={phone}
                required
              />
            </div>
            <div className={classes.form_control}>
              <label htmlFor="country">Country:</label>
              <input
                type="text"
                id="country"
                name="country"
                onChange={countryChangeHandler}
                placeholder="Enter country name"
                value={country}
                required
              />
            </div>
            <div className={classes.form_control}>
              <label htmlFor="post_code">Post Code:</label>
              <input
                type="text"
                id="post_code"
                name="post_code"
                onChange={postCodeChangeHandler}
                placeholder="Enter post code"
                value={postCode}
                required
              />
            </div>
            <div className={classes.form_control}>
              <label htmlFor="address">Address:</label>
              <input
                type="text"
                id="address"
                name="address"
                onChange={addressChangeHandler}
                placeholder="Enter Street/Address"
                value={address}
                required
              />
            </div>
            <button type="submit">Order</button>
          </fieldset>
        </form>
      </>
    );
  }

  return <div className={classes.container}>{cartContent}</div>;
};

export default Checkout;
