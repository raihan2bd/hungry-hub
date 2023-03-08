import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchFoods } from '../../redux/foods/foodsSlice';
import Card from '../UI/Card';
import FoodItem from './FoodItem/FoodItem';
import classes from './Foods.module.css';

const Foods = () => {
  const [searchInput, setSearchInput] = useState('');
  const {foods, loading, error} = useSelector((state) => state.foods)
  const dispatch = useDispatch();
  
  const onChangeHandler = (e) => {
    setSearchInput(e.target.value.trim())
  }

  useEffect(() => {
    dispatch(fetchFoods('foods'));
  }, [dispatch])

  let foodItemList = foods;
  if (searchInput.length > 0) {
    foodItemList = foods.filter((item) =>
      item.name
        .toLowerCase()
        .includes(searchInput.toLowerCase())
    );
  }

  let foodList = <p>No Food Item Found!!</p>;

  if(foodItemList.length> 0) {
    foodList = foodItemList.map((food) => {
      return (
        <FoodItem
          key={food.id}
          id={food.id}
          name={food.name}
          description={food.description}
          price={food.price}
          img={food.img}
        />
      );
    });
  }

  let foodsContent;

  if(loading) {
    foodsContent = <p className={classes.loading}>Loading...</p>
  } else if (error) {
    foodsContent = <p className={classes.error}>{error}</p>
  } else {
    foodsContent = (
      <>
         <div className={classes.food_items_header}>
          <h3>Delicious Food</h3>
          <input type="search" value={searchInput} onChange={onChangeHandler} placeholder="Search Food Here.." />
        </div>
        <ul className={classes.food_items}>{foodList}</ul>
      </>
    )
  }

  return (
    <>
      <Card>
       {foodsContent}
      </Card>
    </>
  );
};

export default Foods;
