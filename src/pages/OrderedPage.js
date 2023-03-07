import axios from 'axios';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const OrderedPage = () => {
  const { token, userId } = useSelector((state) => state.auth);
  useEffect(() => {
    axios
      .get(
        `https://food-order-ed00a-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json?auth=${token}&orderBy="userId"&equalTo="${userId}"`
      )
      .then((response) => console.log(response.data))
      .catch((err) => console.log(err));
  }, [token, userId]);
  return (
    <section>
      <h2> Hello from ordered page!!</h2>
    </section>
  );
};

export default OrderedPage;
