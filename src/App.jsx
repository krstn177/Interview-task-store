import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { useContext, useRef } from 'react';
import { Navbar } from './components/shared/navbar/navbar';

import './App.css';
import { CartProvider, CartContext } from './context/CartContext';
import { Cart } from './components/shared/cart/Cart';

function App() {
  const cartRef = useRef(null);
  const { showCart } = useContext(CartContext);
  
  return (
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<div>Home Page</div>} />
          <Route path="/category/:id" element={<div>Category Page</div>} />
        </Routes>
        <CSSTransition
          in={showCart}
          timeout={700}
          classNames="fade"
          unmountOnExit
          nodeRef={cartRef}  // Add this
        >
          <div ref={cartRef}>  {/* Wrap Cart in div */}
            <Cart />
          </div>
        </CSSTransition>
      </Router>
  );
}

export default App;
