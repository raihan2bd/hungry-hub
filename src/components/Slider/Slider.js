import React from 'react';
import AliceCarousel from 'react-alice-carousel';

import TestyImage from '../../assets/testy-dishes.jpg';
import FastImage from '../../assets/fast-delivery.jpg';
import SecureImage from '../../assets/secure-payment.jpg';
import classes from './Slider.module.css';
import 'react-alice-carousel/lib/alice-carousel.css';

const Slider = () => {
  const items = [
    <div className={classes.slider_item} data-value="1">
      <div className={classes.slider_image}>
        <img src={TestyImage} alt="Testy" />
      </div>
      <div className={classes.slider_title}>
        <h2>
          Discover a wide range of tasty dishes from local restaurants and food
          vendors
        </h2>
      </div>
    </div>,
    <div className={classes.slider_item} data-value="1">
      <div className={classes.slider_image}>
        <img src={FastImage} alt="Fastest Delivary" />
      </div>
      <div className={classes.slider_title}>
        <h2>
          Enjoy fast and reliable delivery right to your doorstep.
        </h2>
      </div>
    </div>,
    <div className={classes.slider_item} data-value="1">
      <div className={classes.slider_image}>
        <img src={SecureImage} alt="Secure Payment" />
      </div>
      <div className={classes.slider_title}>
        <h2>
          Benefit from our secure payment system and hassle-free returns policy
        </h2>
      </div>
    </div>,
  ];
  return (
    <AliceCarousel
      items={items}
      autoPlay
      autoPlayControls
      autoPlayStrategy="none"
      autoPlayInterval={3000}
      animationDuration={2000}
      animationType="fadeout"
      infinite
    />
  );
};

export default Slider;
