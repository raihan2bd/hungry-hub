import React from 'react';



import Auth from '../components/Auth/Auth';
import bgImg from '../assets/food-wallpaper.jpg';
import classes from './AuthPage.module.css';

const AuthPage = () => (
  <section style={{backgroundImage: `url(${bgImg})`}} className={classes.auth_section}>
    <Auth />
  </section>
);

export default AuthPage;
