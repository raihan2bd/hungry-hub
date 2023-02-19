import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import { login } from '../../redux/auth/authSlice';
import classes from './Auth.module.css';

const Auth = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const authState = useSelector((state) => state.auth);
  const {isAuth} = authState;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeLoggInHandler = () => {
    setIsLoggedIn((prevState) => !prevState);
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    dispatch(login({
      email, password, isLoggedIn
    }))
  };

  useEffect(() => {
    if (isAuth) {
      navigate('/', { replace: true })
    }
  }, [isAuth, navigate])

  let formContent = <div>Loading...</div>;
  if (!authState.loading) {
    formContent = (
      <>
        {isLoggedIn? <h2>Log In</h2>: <h2>Sign up</h2>}
        <form onSubmit={formSubmitHandler} className={classes.form}>
          {authState.error && (
            <p className={classes.form_error}>{authState.error}</p>
          )}
          <div className={classes.form_control}>
            <label htmlFor="email">E-mail: </label>
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your E-mail here"
              ref={emailRef}
            />
          </div>
          <div className={classes.form_control}>
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              name="password"
              minLength="6"
              required
              placeholder="Enter your Password here.."
              ref={passwordRef}
            />
          </div>
          <button className={classes.btn_submit} type="submit">{isLoggedIn ? 'Login' : 'Sign Up'}</button>
        </form>
        <p>
          {isLoggedIn
            ? "Don't have an Account Click here create a new one!"
            : 'Already have an account Please click Loging to login'}
        </p>
        <button className={classes.btn_change_auth} type="button" onClick={changeLoggInHandler}>
          {isLoggedIn ? 'Create an Account' : 'Login'}
        </button>
      </>
    );
  }

  return <div className={classes.container}>{formContent}</div>;
};

export default Auth;
