import React from 'react';

import Auth from '../components/Auth/Auth';
import classes from './AuthPage.module.css';

const AuthPage = () => (
  <section className={classes.auth_section}>
    <Auth />
  </section>
);

export default AuthPage;
