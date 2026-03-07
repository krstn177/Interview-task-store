import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {

  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : {};
  });

  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const toggleCart = () => {
    setShowCart((prevShowCart) => {
      const newShowCart = !prevShowCart;
      console.log(newShowCart);
      return newShowCart;
    });
  };

  const incrementCount = (productId) => {
    setCartItems((prevCartItems) => {
      const currentProduct = prevCartItems[productId];
      if (currentProduct.count >= 10) return prevCartItems;
      return {
        ...prevCartItems,
        [productId]: {
          ...currentProduct,
          count: currentProduct.count + 1,
        },
      };
    });
  };

  const decrementCount = (productId) => {
    setCartItems((prevCartItems) => {
      const currentProduct = prevCartItems[productId];
      if (currentProduct.count <= 1) return prevCartItems;
      return {
        ...prevCartItems,
        [productId]: {
          ...currentProduct,
          count: currentProduct.count - 1,
        },
      };
    });
  };

  const addToCart = (productId) => {
    if (Object.keys(cartItems).includes(productId)) {
      return;
    } else {
      setCartItems((prevCartItems) => { 
       return {...prevCartItems, [productId]: products[productId]}
    });
    }
  };

  const addOtherProductToCart = (product, setCount) => {
    if (!showCart) toggleCart();
    if (Object.keys(cartItems).includes(product.id)) {
      return;
    } else {
      setCartItems((prevCartItems) => {
        return { ...prevCartItems, [product.id]: {...product, count: setCount ? setCount : 1} }
      });
    }
  }

  const removeFromCart = (productId) => {
    if (cartItems.hasOwnProperty(productId)) {
      const { [productId]: _, ...newObject } = cartItems;
      setCartItems(newObject);
    }
  };

  const resetCart = () => {
    setCartItems({});
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        showCart,
        toggleCart,
        addOtherProductToCart,
        removeFromCart,
        incrementCount,
        decrementCount,
        resetCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
