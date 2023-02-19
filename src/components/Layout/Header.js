import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { cartActions } from '../../redux/cart/cartSlice';
import { authActions } from '../../redux/auth/authSlice';
import Cart from '../Cart/Cart';
import HeaderCartButton from './HeaderCartButton';
import classes from './Header.module.css';
import { NavLink } from 'react-router-dom';

const Header = () => {
  const cartIsShown = useSelector((state) => state.cart.cartIsShown)
  const isAuth = useSelector((state) => state.auth.isAuth);
  const dispatch = useDispatch();

  const cartShowHandler = () => {
    dispatch(cartActions.showCart());
  }

  const cartHideHandler = () => {
    dispatch(cartActions.hideCart())
  }

  const logoutHandler = () => {
    dispatch(authActions.logout())
  }

  return (
    <>
      <header className={classes.header}>
        <div className={classes.brand}>
          <h1>HungryHub</h1>
        </div>
        <nav className={classes.nav}>
          <ul className={classes.nav_items}>
            <li className={classes.nav_item}>
              <NavLink to="/">Home</NavLink>
            </li>
           {!isAuth && <li className={classes.nav_item}>
              <NavLink to="/auth">Login</NavLink>
            </li>}
            {isAuth && <li className={classes.nav_item}>
              <button onClick={logoutHandler} className={classes.btn_logout} type='button'>Logout</button>
            </li>}
          </ul>
          <HeaderCartButton onClick={cartShowHandler} />
        </nav>
      </header>
      {cartIsShown && <Cart onHideCart={cartHideHandler} />}
    </>
  );
};

export default Header;
