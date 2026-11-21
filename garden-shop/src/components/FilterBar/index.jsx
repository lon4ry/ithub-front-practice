import styles from './FilterBar.module.css';

function FilterBar({ filters, onChange }) {
  const update = (patch) => onChange({ ...filters, ...patch });

  return (
    <form className={styles.bar} onSubmit={(event) => event.preventDefault()}>
      <div className={styles.group}>
        <span className={styles.label}>Price</span>
        <input
          className={styles.input}
          type="number"
          min="0"
          placeholder="from"
          aria-label="Price from"
          value={filters.priceFrom}
          onChange={(event) => update({ priceFrom: event.target.value })}
        />
        <input
          className={styles.input}
          type="number"
          min="0"
          placeholder="to"
          aria-label="Price to"
          value={filters.priceTo}
          onChange={(event) => update({ priceTo: event.target.value })}
        />
      </div>
      <label className={styles.check}>
        <input
          type="checkbox"
          checked={filters.onlyDiscounted}
          onChange={(event) => update({ onlyDiscounted: event.target.checked })}
        />
        Discounted items
      </label>
      <label className={styles.group}>
        <span className={styles.label}>Sorted</span>
        <select
          className={styles.select}
          value={filters.sort}
          onChange={(event) => update({ sort: event.target.value })}
        >
          <option value="default">by default</option>
          <option value="price-asc">price: low to high</option>
          <option value="price-desc">price: high to low</option>
          <option value="title">by name</option>
        </select>
      </label>
    </form>
  );
}

export default FilterBar;
