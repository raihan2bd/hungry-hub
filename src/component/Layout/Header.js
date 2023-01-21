import React from 'react';

import HeaderCartButton from './HeaderCartButton';
import mealImage from '../../assets/meals.jpg';
import classes from './Header.module.css';

const Header = (props) => {
  return (
    <React.Fragment>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton />
      </header>

      <div className={classes['main-image']}>
        <img src={mealImage} alt="A table full of dilicious food!" />
      </div>
    </React.Fragment>
  );
};

export default Header;
