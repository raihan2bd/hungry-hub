import classes from './Order.module.css';
const Order = ({ order }) => {
  const {customarData} = order;
  return (
    <li className={classes.order}>
      <div className={classes.order_items_summery}>
        <ul className={classes.order_items}>
          {order.Items.map((item) => (
            <li key={item.id} className={classes.item}>
              <h4>{item.name}</h4>
              <span className={classes.order_amount}>x {item.amount}</span>
              <p className={classes.order_item_price}>&#36;{item.price}</p>
            </li>
          ))}
        </ul>
        <h4 className={classes.order_total_price}>
          Total Price: <span>&#36;{order.totalAmount}</span>
        </h4>
      </div>
      <div className={classes.customar_info}>
        <ul className={classes.customar_info_item}>
            <li className={classes.item}>
              Full Name:  {customarData.fullName}
            </li>
            <li className={classes.item}>
              E-Mail: {customarData.email}
            </li>
            <li className={classes.item}>
              Phone: {customarData.phone}
            </li>
            <li className={classes.item}>
              Country: {customarData.country}
            </li>
            <li className={classes.item}>
              PostCode: {customarData.postCode}
            </li>
            <li className={classes.item}>
              Address: {customarData.address}
            </li>
        </ul>
      </div>
    </li>
  );
};

export default Order;
