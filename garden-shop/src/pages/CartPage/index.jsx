import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearCart,
  selectCartCount,
  selectCartItems,
  selectCartTotal,
} from '../../store/cartSlice';
import CartList from '../../components/CartList';
import OrderForm from '../../components/OrderForm';
import Notification from '../../components/Notification';
import styles from './CartPage.module.css';

function CartPage() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const count = useSelector(selectCartCount);
  const total = useSelector(selectCartTotal);
  const [isOrdered, setIsOrdered] = useState(false);

  const handleOrdered = () => {
    dispatch(clearCart());
    setIsOrdered(true);
  };

  return (
    <div className="container page">
      <h1 className="pageTitle">Shopping cart</h1>

      {items.length ? (
        <div className={styles.columns}>
          <CartList items={items} />
          <aside className={styles.details}>
            <h2 className={styles.detailsTitle}>Order details</h2>
            <div className={styles.summary}>
              <span>
                {count} {count === 1 ? 'item' : 'items'}
              </span>
              <span>Total</span>
              <strong className={styles.total}>${total.toFixed(2)}</strong>
            </div>
            <OrderForm onOrdered={handleOrdered} />
          </aside>
        </div>
      ) : (
        <div className={styles.empty}>
          <p className={styles.emptyText}>Looks like you have no items in your cart.</p>
          <Link to="/products" className={styles.continueButton}>
            Continue shopping
          </Link>
        </div>
      )}

      {isOrdered && (
        <Notification
          title="Congratulations!"
          text="Your order has been successfully placed. A manager will contact you shortly."
          onClose={() => setIsOrdered(false)}
        />
      )}
    </div>
  );
}

export default CartPage;
