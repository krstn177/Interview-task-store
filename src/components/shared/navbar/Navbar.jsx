import styles from './Navbar.module.css';
import { useContext } from 'react';
import { CartContext } from '../../../context/CartContext';
import { NavLink } from 'react-router-dom';
import productsData from '../../../../data/products.json';

export const Navbar = () => {
  const { categories } = productsData;
  const { cartItems, toggleCart } = useContext(CartContext);

  return (
    <nav>
      <div className={styles.navbarContainer}>
        <div className={styles.navbarLogo}>
          <NavLink to="/category/1">
            <img src="/logo.png" alt="Store Logo" />
          </NavLink>
        </div>
        <ul className={styles.navbarLinks}>
          {categories.map(category => (
            <li key={category.id}>
              <NavLink
                to={`/category/${category.id}`}
                className={({ isActive }) =>
                  isActive ? styles.activeLink : undefined
                }
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
