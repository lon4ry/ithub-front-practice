import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCartCount } from '../../store/cartSlice';
import logo from '../../assets/logo.svg';
import cartIcon from '../../assets/cart.svg';
import styles from './Header.module.css';

const links = [
  { to: '/', label: 'Main Page', end: true },
  { to: '/categories', label: 'Categories' },
  { to: '/products', label: 'All products', end: true },
  { to: '/sales', label: 'All sales' },
];

function Header() {
  const count = useSelector(selectCartCount);
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);
  const linkClassName = ({ isActive }) => (isActive ? `${styles.link} ${styles.active}` : styles.link);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <button
          type="button"
          className={styles.burger}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
        <Link to="/" className={styles.logo} onClick={closeMenu}>
          <img src={logo} alt="Garden shop" />
        </Link>
        <nav className={isOpen ? `${styles.nav} ${styles.navOpen}` : styles.nav}>
          {links.map(({ to, label, end }) => (
            <NavLink key={to} to={to} end={end} className={linkClassName} onClick={closeMenu}>
              {label}
            </NavLink>
          ))}
        </nav>
        <Link to="/cart" className={styles.cart} aria-label="Shopping cart">
          <img src={cartIcon} alt="" />
          {count > 0 && <span className={styles.badge}>{count}</span>}
        </Link>
      </div>
    </header>
  );
}

export default Header;
