import { Link } from 'react-router-dom';
import { imageUrl } from '../../api';
import styles from './CategoryItem.module.css';

function CategoryItem({ category }) {
  return (
    <Link to={`/categories/${category.id}`} className={styles.item}>
      <div className={styles.imageWrap}>
        <img src={imageUrl(category.image)} alt={category.title} loading="lazy" />
      </div>
      <span className={styles.title}>{category.title}</span>
    </Link>
  );
}

export default CategoryItem;
