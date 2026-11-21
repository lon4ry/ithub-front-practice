import { useForm } from 'react-hook-form';
import { sendOrder } from '../../api';
import styles from './OrderForm.module.css';

function OrderForm({ onOrdered }) {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await sendOrder(data);
      reset();
      onOrdered();
    } catch {
      setError('root', { message: 'Could not send the order. Please try again.' });
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className={styles.field}>
        <input
          className={styles.input}
          type="text"
          placeholder="Name"
          aria-label="Name"
          {...register('name', { required: 'Enter your name' })}
        />
        {errors.name && <span className={styles.error}>{errors.name.message}</span>}
      </div>
      <div className={styles.field}>
        <input
          className={styles.input}
          type="tel"
          placeholder="Phone number"
          aria-label="Phone number"
          {...register('phone', {
            required: 'Enter your phone number',
            pattern: { value: /^[+\d][\d\s()-]{6,}$/, message: 'Enter a valid phone number' },
          })}
        />
        {errors.phone && <span className={styles.error}>{errors.phone.message}</span>}
      </div>
      <div className={styles.field}>
        <input
          className={styles.input}
          type="email"
          placeholder="Email"
          aria-label="Email"
          {...register('email', {
            required: 'Enter your email',
            pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' },
          })}
        />
        {errors.email && <span className={styles.error}>{errors.email.message}</span>}
      </div>
      {errors.root && <span className={styles.error}>{errors.root.message}</span>}
      <button className={styles.submit} type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Order'}
      </button>
    </form>
  );
}

export default OrderForm;
