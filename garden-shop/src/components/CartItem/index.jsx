import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { decrementQuantity, incrementQuantity, removeFromCart } from '../../store/cartSlice';
import { imageUrl } from '../../api';
import { formatPrice, getPrice } from '../../utils/products';
import QuantityControl from '../QuantityControl';
import styles from './CartItem.module.css';

function CartItem({ item }) {
  const dispatch = useDispatch();

  return (
    <li className={styles.item}>
      <Link to={`/products/${item.id}`} className={styles.imageLink}>
        <img src={imageUrl(item.image)} alt={item.title} />
      </Link>
      <div className={styles.info}>
        <Link to={`/products/${item.id}`} className={styles.title}>
          {item.title}
        </Link>
        <div className={styles.bottom}>
          <QuantityControl
            value={item.quantity}
            onDecrement={() => dispatch(decrementQuantity(item.id))}
            onIncrement={() => dispatch(incrementQuantity(item.id))}
          />
          <span className={styles.price}>{formatPrice(getPrice(item) * item.quantity)}</span>
        </div>
      </div>
      <button
        type="button"
        className={styles.remove}
        aria-label={`Remove ${item.title} from cart`}
        onClick={() => dispatch(removeFromCart(item.id))}
      >
        &times;
      </button>
    </li>
  );
}

export default CartItem;
