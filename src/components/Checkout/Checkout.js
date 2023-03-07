import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import classes from './Checkout.module.css';
const Checkout = () => {
  const [fullName, setFullname] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [postCode, setPostCode] = useState('');
  const [address, setAddress] = useState('');
  const [hasError, setHasError] = useState(true);

  const { items, totalAmount } = useSelector((state) => state.cart);
  const authToken = useSelector((state) => state.auth.authToken);
  const navigate = useNavigate();

  const fullnameChangeHandler = (e) => {
    setFullname(e.target.value);
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
      return
    }
    const cartData = {
      Items: items,
      totalAmount: totalAmount,
      fullName: fullName.trim(),
      phone: phone.trim(),
      country: country.trim(),
      postCode: postCode.trim(),
      address: address.trim(),
    };
    console.log(cartData);
    
  };

  // useEffect(() => {
  //   if(!authToken) {
  //     navigate('/auth', {replace: true})
  //   }
  // }, [authToken, navigate])

  useEffect(() => {
    if (
      fullName.trim().length > 2 &&
      phone.trim().length > 2 &&
      country.trim().length > 2 &&
      postCode.trim().length > 2 &&
      address.trim().length > 2
    ) {
      setHasError(false);
    } else {
      setHasError(true);
    }

    if (items.length <= 0) {
      navigate('/', { replace: true });
    }
  }, [items, navigate, fullName, phone, country, postCode, address]);

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
        <p className={classes.cart_total_price}>
          Total Price: <span>{totalAmount.toFixed(2)}</span>
        </p>
      </div>
      <div className={classes.checkout_form_section}>
        <form className={classes.checkout_form} onSubmit={formSubmitHandler}>
          <h2>Checkout Form</h2>
          {hasError && (
            <p className={classes.has_error}>
              All the fields is required and min it should be at least 3 char
              long !!
            </p>
          )}
          <fieldset className={classes.form_group}>
            <input
              type="text"
              name="fullname"
              onChange={fullnameChangeHandler}
              placeholder="Enter your full name here.."
              value={fullName}
              required
            />
            <input
              type="text"
              name="phone"
              onChange={phoneChangeHandler}
              placeholder="Enter your phone number here.."
              value={phone}
              required
              />
            <input
              type="text"
              name="country"
              onChange={countryChangeHandler}
              placeholder="Enter your country name here"
              value={country}
              required
              />
            <input
              type="text"
              name="post_code"
              onChange={postCodeChangeHandler}
              placeholder="Enter your post code here"
              value={postCode}
              required
            />
            <input
              type="text"
              name="address"
              onChange={addressChangeHandler}
              placeholder="Enter your Street/Address here"
              value={address}
              required
            />
            <button type="submit">Order</button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
