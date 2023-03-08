import React from 'react';

import classes from './HomePage.module.css'

import Foods from '../components/Foods/Foods';
import Slider from '../components/Slider/Slider';
const HomePage = () => {
  return (
    <>
    <section className={classes.headline_section}>
     <Slider />
    </section>
    <section className={classes.foods_section}>
      <Foods />
    </section>
    </>
  )
}

export default HomePage;