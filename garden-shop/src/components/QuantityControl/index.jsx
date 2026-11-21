import styles from './QuantityControl.module.css';

function QuantityControl({ value, onDecrement, onIncrement }) {
  return (
    <div className={styles.control}>
      <button type="button" className={styles.button} onClick={onDecrement} aria-label="Decrease quantity">
        &minus;
      </button>
      <span className={styles.value}>{value}</span>
      <button type="button" className={styles.button} onClick={onIncrement} aria-label="Increase quantity">
        +
      </button>
    </div>
  );
}

export default QuantityControl;
