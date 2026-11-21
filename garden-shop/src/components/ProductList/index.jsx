import ProductCard from '../ProductCard';
import styles from './ProductList.module.css';

function ProductList({ products }) {
  if (!products.length) {
    return <p className={styles.empty}>No products found.</p>;
  }

  return (
    <ul className={styles.list}>
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}

export default ProductList;
