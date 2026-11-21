import CartItem from '../CartItem';
import styles from './CartList.module.css';

function CartList({ items }) {
  return (
    <ul className={styles.list}>
      {items.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
    </ul>
  );
}

export default CartList;
