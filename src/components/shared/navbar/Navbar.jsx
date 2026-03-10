import styles from './Navbar.module.css';
import { useContext, useState } from 'react';
import { CartContext } from '../../../context/CartContext';
import { NavLink } from 'react-router-dom';
import productsData from '../../../../data/products.json';

export const Navbar = () => {
  const { categories } = productsData;
  const { cartItems, toggleCart } = useContext(CartContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <div className={styles.navbarLogo}>
          <NavLink to="/category/1">
            <img src="/logo.png" alt="Store Logo" />
          </NavLink>
        </div>
        <button className={styles.hamburger} onClick={toggleMenu}>
          <i className="fa-solid fa-bars"></i>
        </button>
        <ul className={`${styles.navbarLinks} ${menuOpen ? styles.open : ''}`}>
          {categories.map(category => (
            <li key={category.id}>
              <NavLink
                to={`/category/${category.id}`}
                className={({ isActive }) =>
                  isActive ? styles.activeLink : undefined
                }
                onClick={() => setMenuOpen(false)}
              >
                {category.name}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className={styles.navbarCart}>
        <button
            className={styles.cartButton}
            onClick={() => {
            toggleCart();
            setMenuOpen(false);
            }}
            data-toggle="modal"
            data-target="#cartModal"
        >
            <div className={styles.cartIconWrapper}>
            <i className="fa-solid fa-cart-shopping"></i>
            <span className={styles.notificationCircle}>{Object.keys(cartItems).length}</span>
            </div>
        </button>
              
        </div>
      </div>
    </nav>
  );
};
