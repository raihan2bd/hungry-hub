import React from 'react';

import mealImage from '../assets/meals.jpg';
import classes from './HomePage.module.css'

import Foods from '../components/Meals/Meals';
const HomePage = () => {
  return (
    <>
    <section className={classes.headline_section}>
      <div className={classes['main-image']}>
        <img src={mealImage} alt="A table full of dilicious food!" />
      </div>
    </section>
    <section>
      <Foods />
    </section>
    </>
  )
}

export default HomePage;