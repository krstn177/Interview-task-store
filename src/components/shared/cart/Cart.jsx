import styles from "./Cart.module.css";
import { useContext } from "react";
import { CartContext } from "../../../context/CartContext";
import { Link } from "react-router-dom";

export const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    toggleCart,
    incrementCount,
    decrementCount,
  } = useContext(CartContext);
  return (
    <>
      <div className={styles.modal}>
        <div className={styles.topTableContainer}>
          <i className={`${styles.cartIcon} fa-solid fa-cart-shopping`}></i>
          <button onClick={toggleCart} className={styles.closeBtn}>
            <i className="fa-solid fa-x"></i>
          </button>
        </div>
        <h2 className={styles.tableHeading}>Your cart</h2>
        <table className={styles.cartTable}>
          {Object.keys(cartItems).length !== 0 && (
            <thead>
              <tr>
                <th className={styles.productCount} colSpan={7}>
                  {Object.keys(cartItems).length} products
                </th>
              </tr>
            </thead>
          )}
          <tbody>
            {Object.keys(cartItems).length === 0 ? (
              <tr>
                <td id={styles.noProducts}>You have no products in the cart.</td>
              </tr>
            ) : (
              Object.values(cartItems).map((item) => (
                <tr key={item.id}>
                  <td>
                    <img
                      src={item.img}
                      alt={item.name}
                      className={styles.productImage}
                    />
                  </td>
                  <td className={styles.productName}>{item.name}</td>
                  <td>{item.price} €</td>
                  <td>
                    <button
                      onClick={() => incrementCount(item.id)}
                      id={styles.incrementBtn}
                    >
                      <i className="fa-solid fa-plus"></i>
                    </button>
                  </td>
                  <td>{item.count}</td>
                  <td>
                    <button
                      onClick={() => decrementCount(item.id)}
                      id={styles.decrementBtn}
                    >
                      <i className="fa-solid fa-minus"></i>
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      id={styles.removeProductBtn}
                    >
                      <i className="fa-solid fa-x"></i>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
            {Object.keys(cartItems).length !== 0 &&
              <div className={styles.checkoutContainer}>
                <Link to="/checkout" onClick={toggleCart} id={styles.checkoutLink}>
                  Continue to Checkout
                </Link>
              </div>
            }
      </div>
    </>
  );
};
