import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { ToastContainer } from 'react-toastify';
import { useContext, useRef } from 'react';
import { Navbar } from './components/shared/navbar/Navbar';

import './App.css';
import { CartContext } from './context/CartContext';
import { Cart } from './components/shared/cart/Cart';
import { CatalogPage } from './components/catalog/catalogpage/CatalogPage';
import Footer from './components/shared/footer/Footer';

function App() {
  const cartRef = useRef(null);
  const { showCart } = useContext(CartContext);
  
  return (
      <Router>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          draggable
        />
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
        <Footer />
      </Router>
  );
}

export default App;
