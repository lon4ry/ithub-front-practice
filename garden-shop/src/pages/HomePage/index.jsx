import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadAllProducts,
  loadCategories,
  selectAllProducts,
  selectCategories,
} from '../../store/productsSlice';
import CategoryList from '../../components/CategoryList';
import ProductList from '../../components/ProductList';
import SaleForm from '../../components/SaleForm';
import Loader from '../../components/Loader';
import { imageUrl } from '../../api';
import styles from './HomePage.module.css';

function HomePage() {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const products = useSelector(selectAllProducts);
  const categoriesStatus = useSelector((state) => state.products.categoriesStatus);
  const productsStatus = useSelector((state) => state.products.productsStatus);

  useEffect(() => {
    if (categoriesStatus === 'idle') dispatch(loadCategories());
    if (productsStatus === 'idle') dispatch(loadAllProducts());
  }, [categoriesStatus, productsStatus, dispatch]);

  const saleProducts = products.filter((product) => product.discont_price).slice(0, 4);

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <img className={styles.heroImage} src={imageUrl('/category_img/1.jpeg')} alt="" />
        <div className={`container ${styles.heroInner}`}>
          <h1 className={styles.heroTitle}>Sale</h1>
          <p className={styles.heroText}>Amazing Discounts on Garden Products!</p>
          <Link to="/sales" className={styles.heroButton}>
            Check out
          </Link>
        </div>
      </section>

      <section className={`container ${styles.section}`}>
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>Categories</h2>
          <Link to="/categories" className={styles.sectionLink}>
            All categories
          </Link>
        </div>
        {categoriesStatus === 'succeeded' ? (
          <CategoryList categories={categories} />
        ) : (
          <Loader />
        )}
      </section>

      <section className={styles.discount}>
        <div className={`container ${styles.discountInner}`}>
          <div>
            <h2 className={styles.discountTitle}>8% discount</h2>
            <p className={styles.discountText}>
              Get a discount on your first order and be the first to know about new arrivals and
              seasonal offers.
            </p>
          </div>
          <div className={styles.discountForm}>
            <h3 className={styles.discountFormTitle}>Get a discount</h3>
            <SaleForm />
          </div>
        </div>
      </section>

      <section className={`container ${styles.section}`}>
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>Sale</h2>
          <Link to="/sales" className={styles.sectionLink}>
            All sales
          </Link>
        </div>
        {productsStatus === 'succeeded' ? <ProductList products={saleProducts} /> : <Loader />}
      </section>
    </div>
  );
}

export default HomePage;
