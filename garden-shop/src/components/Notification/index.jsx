import { useEffect } from 'react';
import styles from './Notification.module.css';

function Notification({ title, text, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={styles.notification} role="status">
      <div>
        <h3 className={styles.title}>{title}</h3>
        {text && <p className={styles.text}>{text}</p>}
      </div>
      <button type="button" className={styles.close} aria-label="Close notification" onClick={onClose}>
        &times;
      </button>
    </div>
  );
}

export default Notification;
