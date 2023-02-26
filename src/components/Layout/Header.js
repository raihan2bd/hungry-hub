import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MdRestaurantMenu, MdOutlineMenu } from 'react-icons/md';

import { cartActions } from '../../redux/cart/cartSlice';
import { authActions } from '../../redux/auth/authSlice';
import Cart from '../Cart/Cart';
import HeaderCartButton from './HeaderCartButton';
import classes from './Header.module.css';
import { NavLink } from 'react-router-dom';

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const cartIsShown = useSelector((state) => state.cart.cartIsShown);
  const isAuth = useSelector((state) => state.auth.isAuth);
  const dispatch = useDispatch();

  const cartShowHandler = () => {
    dispatch(cartActions.showCart());
  };

  const cartHideHandler = () => {
    dispatch(cartActions.hideCart());
  };

  const logoutHandler = () => {
    dispatch(authActions.logout());
  };

  const showMenuHandler = () => {
    setShowMenu(true);
  };

  const hideMenuHandler = () => {
    setShowMenu(false);
  };

  return (
    <>
      <header className={classes.header}>
        <div className={classes.brand}>
          <span className={classes.menu_icon}>
            {!showMenu && <MdOutlineMenu onClick={showMenuHandler} />}
            {showMenu && <MdRestaurantMenu onClick={hideMenuHandler} />}
          </span>
          <h1>HungryHub</h1>
        </div>
        <nav className={classes.nav}>
          <ul
            className={`${classes.nav_items} ${
              showMenu ? classes.nav_items_mobile : ''
            }`}
          >
            <li className={classes.nav_item}>
              <NavLink
                onClick={hideMenuHandler}
                className={classes.nav_link}
                to="/"
              >
                Home
              </NavLink>
            </li>
            {isAuth && (
              <li className={classes.nav_item}>
                <NavLink
                  onClick={hideMenuHandler}
                  className={classes.nav_link}
                  to="/order"
                >
                  Order
                </NavLink>
              </li>
            )}
            <li className={classes.nav_item}>
              <NavLink
                onClick={hideMenuHandler}
                className={classes.nav_link}
                to="/about"
              >
                About
              </NavLink>
            </li>
            {!isAuth && (
              <li className={classes.nav_item}>
                <NavLink
                  onClick={hideMenuHandler}
                  className={classes.nav_link}
                  to="/auth"
                >
                  Login
                </NavLink>
              </li>
            )}
            {isAuth && (
              <li onClick={hideMenuHandler} className={classes.nav_item}>
                <button
                  onClick={logoutHandler}
                  className={classes.btn_logout}
                  type="button"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
          <HeaderCartButton onClick={cartShowHandler} />
        </nav>
      </header>
      {cartIsShown && <Cart onHideCart={cartHideHandler} />}
    </>
  );
};

export default Header;
