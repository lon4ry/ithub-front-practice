import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadAllProducts, selectAllProducts } from '../../store/productsSlice';
import { defaultFilters, filterProducts } from '../../utils/products';
import FilterBar from '../../components/FilterBar';
import ProductList from '../../components/ProductList';
import Loader from '../../components/Loader';

function SalePage() {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts).filter((product) => product.discont_price);
  const status = useSelector((state) => state.products.productsStatus);
  const [filters, setFilters] = useState(defaultFilters);

  useEffect(() => {
    if (status === 'idle') dispatch(loadAllProducts());
  }, [status, dispatch]);

  return (
    <div className="container page">
      <h1 className="pageTitle">All sales</h1>
      {status === 'succeeded' ? (
        <>
          <FilterBar filters={filters} onChange={setFilters} />
          <ProductList products={filterProducts(products, filters)} />
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default SalePage;
