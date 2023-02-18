import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Layout/Header';
import Cart from './components/Cart/Cart';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderedPage from './pages/OrderedPage';

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };
  return (
    <>
      {cartIsShown && <Cart onHideCart={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/auth' element={<AuthPage />} />
          <Route path='/checkout' element={<CheckoutPage />} />
          <Route path='/ordered' element={<OrderedPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
