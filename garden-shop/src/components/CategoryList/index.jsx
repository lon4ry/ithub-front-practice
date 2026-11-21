import CategoryItem from '../CategoryItem';
import styles from './CategoryList.module.css';

function CategoryList({ categories }) {
  return (
    <ul className={styles.list}>
      {categories.map((category) => (
        <li key={category.id}>
          <CategoryItem category={category} />
        </li>
      ))}
    </ul>
  );
}

export default CategoryList;
