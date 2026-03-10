import React, { useContext } from 'react';
import { CartContext } from '../../../context/CartContext';
import styles from './ProductCard.module.css';

export const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    addToCart(product);
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    return (
      <div className={styles.stars}>
        {'★'.repeat(fullStars)}
        {hasHalfStar && '☆'}
        {'☆'.repeat(emptyStars)}
        <span className={styles.ratingNumber}>({rating})</span>
      </div>
    );
  };

  return (
    <div className={styles.card}>
      <img src={product.image} alt={product.model} className={styles.image} />
      <div className={styles.details}>
        <h3 className={styles.name}>{product.model}</h3>
        <p className={styles.brand}>{product.brand}</p>
        <p className={styles.description}>{product.description}</p>
        <div className={styles.priceContainer}>
          {product.originalPrice && (
            <span className={styles.originalPrice}>${product.originalPrice}</span>
          )}
          <span className={styles.price}>${product.price}</span>
        </div>
        {renderStars(product.stars)}
        <button className={styles.addButton} onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};
