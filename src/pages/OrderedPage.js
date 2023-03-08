import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../redux/order/orderSlice';

import Order from '../components/Order/Order';
import classes from './OrderedPage.module.css';

const OrderedPage = () => {
  const { token, userId } = useSelector((state) => state.auth);
  const orders = useSelector((state) => state.orders.orders);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/auth');
      return;
    }
    dispatch(fetchOrders({ token, userId }));
  }, [token, userId, dispatch, navigate]);

  let ordersContent = (
    <p>
      No ordered found!! Please order new food item now!! <Link to="/">Back to Home</Link>
    </p>
  );
  if (orders.length > 0) {
    ordersContent = (
      <div className={classes.container}>
        <h2 className={classes.title}>Your Orders ({orders.length})</h2>
        <ul className={classes.orders}>
          {orders.map((order) => (
            <Order key={order.id} order={order} />
          ))}
        </ul>
      </div>
    );
  }
  return (
    <section>
     {ordersContent}
    </section>
  );
};

export default OrderedPage;
