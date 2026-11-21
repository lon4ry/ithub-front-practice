import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadCategories, selectCategories } from '../../store/productsSlice';
import CategoryList from '../../components/CategoryList';
import Loader from '../../components/Loader';

function CategoriesPage() {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const status = useSelector((state) => state.products.categoriesStatus);

  useEffect(() => {
    if (status === 'idle') dispatch(loadCategories());
  }, [status, dispatch]);

  return (
    <div className="container page">
      <h1 className="pageTitle">Categories</h1>
      {status === 'succeeded' ? <CategoryList categories={categories} /> : <Loader />}
    </div>
  );
}

export default CategoriesPage;
