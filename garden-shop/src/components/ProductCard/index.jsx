import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/cartSlice';
import { imageUrl } from '../../api';
import { formatPrice, getDiscountPercent, getPrice } from '../../utils/products';
import styles from './ProductCard.module.css';

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const discount = getDiscountPercent(product);

  const handleAdd = () => {
    dispatch(addToCart({ product }));
  };

  return (
    <article className={styles.card}>
      <div className={styles.imageWrap}>
        <Link to={`/products/${product.id}`} className={styles.imageLink}>
          <img src={imageUrl(product.image)} alt={product.title} loading="lazy" />
        </Link>
        {discount > 0 && <span className={styles.badge}>-{discount}%</span>}
        <button type="button" className={styles.addButton} onClick={handleAdd}>
          Add to cart
        </button>
      </div>
      <Link to={`/products/${product.id}`} className={styles.title}>
        {product.title}
      </Link>
      <div className={styles.prices}>
        <span className={styles.price}>{formatPrice(getPrice(product))}</span>
        {discount > 0 && <span className={styles.oldPrice}>{formatPrice(product.price)}</span>}
      </div>
    </article>
  );
}

export default ProductCard;
