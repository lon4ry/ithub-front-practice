import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  loadCategoryProducts,
  selectCategory,
  selectCategoryProducts,
} from '../../store/productsSlice';
import { defaultFilters, filterProducts } from '../../utils/products';
import FilterBar from '../../components/FilterBar';
import ProductList from '../../components/ProductList';
import Loader from '../../components/Loader';

function ProductsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const category = useSelector(selectCategory);
  const products = useSelector(selectCategoryProducts);
  const status = useSelector((state) => state.products.categoryStatus);
  const error = useSelector((state) => state.products.error);
  const [filters, setFilters] = useState(defaultFilters);

  useEffect(() => {
    dispatch(loadCategoryProducts(id));
    setFilters(defaultFilters);
  }, [id, dispatch]);

  return (
    <div className="container page">
      <h1 className="pageTitle">{category?.title ?? 'Products'}</h1>
      {status === 'failed' && <p>{error}</p>}
      {status === 'loading' ? (
        <Loader />
      ) : (
        <>
          <FilterBar filters={filters} onChange={setFilters} />
          <ProductList products={filterProducts(products, filters)} />
        </>
      )}
    </div>
  );
}

export default ProductsPage;
