import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { useContext, useRef } from 'react';
import { Navbar } from './components/shared/navbar/navbar';

import './App.css';
import { CartProvider, CartContext } from './context/CartContext';
import { Cart } from './components/shared/cart/Cart';
import { CatalogPage } from './components/catalog/catalogpage/CatalogPage';

function App() {
  const cartRef = useRef(null);
  const { showCart } = useContext(CartContext);
  
  return (
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/category/1" replace />} />
          <Route path="/category/:id" element={<CatalogPage />} />
        </Routes>
        <CSSTransition
          in={showCart}
          timeout={700}
          classNames="fade"
          unmountOnExit
          nodeRef={cartRef}
        >
          <div ref={cartRef}>
            <Cart />
          </div>
        </CSSTransition>
      </Router>
  );
}

export default App;
