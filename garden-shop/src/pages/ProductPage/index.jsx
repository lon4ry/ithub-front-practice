import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addToCart } from '../../store/cartSlice';
import { loadProduct, selectProduct } from '../../store/productsSlice';
import { formatPrice, getDiscountPercent, getPrice } from '../../utils/products';
import { imageUrl } from '../../api';
import QuantityControl from '../../components/QuantityControl';
import Loader from '../../components/Loader';
import Notification from '../../components/Notification';
import styles from './ProductPage.module.css';

function ProductPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector(selectProduct);
  const status = useSelector((state) => state.products.productStatus);
  const error = useSelector((state) => state.products.error);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    dispatch(loadProduct(id));
    setQuantity(1);
  }, [id, dispatch]);

  if (status === 'loading' || status === 'idle') {
    return (
      <div className="container page">
        <Loader />
      </div>
    );
  }

  if (status === 'failed' || !product) {
    return (
      <div className="container page">
        <h1 className="pageTitle">Product not found</h1>
        <p>{error}</p>
      </div>
    );
  }

  const discount = getDiscountPercent(product);

  const handleAdd = () => {
    dispatch(addToCart({ product, quantity }));
    setIsAdded(true);
  };

  return (
    <div className="container page">
      <div className={styles.product}>
        <div className={styles.imageWrap}>
          <img src={imageUrl(product.image)} alt={product.title} />
        </div>
        <div className={styles.info}>
          <h1 className={styles.title}>{product.title}</h1>
          <div className={styles.prices}>
            <span className={styles.price}>{formatPrice(getPrice(product))}</span>
            {discount > 0 && (
              <>
                <span className={styles.oldPrice}>{formatPrice(product.price)}</span>
                <span className={styles.badge}>-{discount}%</span>
              </>
            )}
          </div>
          <div className={styles.actions}>
            <QuantityControl
              value={quantity}
              onDecrement={() => setQuantity((value) => Math.max(1, value - 1))}
              onIncrement={() => setQuantity((value) => value + 1)}
            />
            <button type="button" className={styles.addButton} onClick={handleAdd}>
              Add to cart
            </button>
          </div>
          <div className={styles.description}>
            <h2 className={styles.descriptionTitle}>Description</h2>
            <p className={styles.descriptionText}>{product.description}</p>
          </div>
        </div>
      </div>
      {isAdded && (
        <Notification
          title="Product added to cart"
          text={product.title}
          onClose={() => setIsAdded(false)}
        />
      )}
    </div>
  );
}

export default ProductPage;
