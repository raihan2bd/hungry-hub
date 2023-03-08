import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../redux/order/orderSlice';

import Order from '../components/Order/Order';

const OrderedPage = () => {
  const { token, userId } = useSelector((state) => state.auth);
  const orders = useSelector((state) => state.orders.orders)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if(!token) {
      navigate('/auth')
      return
    }
   dispatch(fetchOrders({token, userId}))
  }, [token, userId, dispatch, navigate]);
  return (
    <section>
      <h2> Hello from ordered page!!</h2>
      {orders.map(order => (
        <Order key={order.id} />
      ))}
    </section>
  );
};

export default OrderedPage;
