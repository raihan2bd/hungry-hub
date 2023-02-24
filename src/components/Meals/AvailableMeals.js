import React from 'react';

import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import BrianyImage from '../../assets/Biryani.jpg';
import PizzaImage from '../../assets/pizza.jpg';
import TajinImage from '../../assets/tajin.png';
import BurgerImage from '../../assets/burger.jpg';
import ChickenBarBQImage from '../../assets/Bar-B-Q.jpg';
import classes from './AvailableMeals.module.css';

const DUMMY_MEALS = [
  {
    id: 'fd1',
    name: 'Bryani',
    description: 'Biryani is a mixed rice dish with its origins among the Muslims of the Indian subcontinent. It is made with Indian spices, rice, and meat, and sometimes, in addition, eggs and/or vegetables such as potatoes in certain regional varieties.',
    img: BrianyImage,
    price: 5.69,
  },
  {
    id: 'fd2',
    name: 'Pizza',
    description: 'Italian pizza with tomato sauce and cheese with a choice of toppings. Pizza is a savory dish of Italian origin consisting of a usually round, flattened base of leavened wheat-based dough topped with tomatoes, cheese, and often various other ingredients baked at a high temperature, traditionally in a wood-fired oven.',
    img: PizzaImage,
    price: 16.5,
  },
  {
    id: 'fd3',
    name: 'Tajine',
    description: 'Tajine is a North African dish that is cooked in a special earthenware pot with a conical lid. It is a slow-cooked dish that is usually made with meat, vegetables, and spices. The dish is named after the pot in which it is cooked.',
    img: TajinImage,
    price: 16.5,
  },
  {
    id: 'fd4',
    name: 'Burger',
    description: 'A hamburger is a sandwich consisting of one or more cooked patties of ground meat, usually beef, placed inside a sliced bread roll or bun. The patty may be pan fried, barbecued, or flame broiled.',
    img: BurgerImage,
    price: 9.37,
  },
  {
    id: 'fd5',
    name: 'Chicken Barbecue',
    description: 'Barbecue chicken is a dish consisting of chicken pieces, usually chicken breasts, marinated in a sauce and then grilled, barbecued, or smoked. The sauce is usually a vinegar-based sauce, but may also be a tomato-based sauce.',
    img: ChickenBarBQImage,
    price: 9.37,
  },
];

const AvailableMeals = () => {
  const mealsList = DUMMY_MEALS.map((meal) => {
    return (
      <MealItem
        key={meal.id}
        id={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
        img={meal.img}
      />
    );
  });
  return (
    <>
      <Card>
        <ul className={classes.food_items}>{mealsList}</ul>
      </Card>
    </>
  );
};

export default AvailableMeals;
