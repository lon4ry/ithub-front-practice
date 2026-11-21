import { Link } from 'react-router-dom';
import leaf from '../../assets/leaf.svg';
import styles from './NotFoundPage.module.css';

function NotFoundPage() {
  return (
    <div className={`container ${styles.wrap}`}>
      <div className={styles.code}>
        4<img className={styles.leaf} src={leaf} alt="" />4
      </div>
      <h1 className={styles.title}>Not Found</h1>
      <p className={styles.text}>
        We&apos;re sorry, the page you requested could not be found.
        <br />
        Please go back to the homepage.
      </p>
      <Link to="/" className={styles.button}>
        Go home
      </Link>
    </div>
  );
}

export default NotFoundPage;
