import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { sendSaleRequest } from '../../api';
import styles from './SaleForm.module.css';

function SaleForm() {
  const [isSent, setIsSent] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await sendSaleRequest(data);
      reset();
      setIsSent(true);
    } catch {
      setError('root', { message: 'Could not send the request. Please try again.' });
    }
  };

  if (isSent) {
    return (
      <div className={styles.success}>
        <h3 className={styles.successTitle}>Thank you!</h3>
        <p>Your request has been sent. We will contact you shortly.</p>
        <button type="button" className={styles.submit} onClick={() => setIsSent(false)}>
          Close
        </button>
      </div>
    );
  }

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
        {isSubmitting ? 'Sending...' : 'Get a discount'}
      </button>
    </form>
  );
}

export default SaleForm;
