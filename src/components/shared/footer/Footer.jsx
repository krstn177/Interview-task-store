import styles from './Footer.module.css';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.brand}>
          <img src="/logo.png" alt="Store Logo" className={styles.logo} />
          <div className={styles.brandText}>
            <h4>Interview Task Store</h4>
            <p>Timeless timepieces for every occasion</p>
          </div>
        </div>

        <div className={styles.links}>
          <h5>Legal</h5>
          <ul>
            <li><a href="#terms">Terms of Service</a></li>
            <li><a href="#privacy">Privacy Policy</a></li>
            <li><a href="#refund">Refund Policy</a></li>
          </ul>
        </div>

        <div className={styles.contact}>
          <h5>Contact</h5>
          <p>support@example.com</p>
          <p>+1 (555) 123-4567</p>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <p>© {new Date().getFullYear()} Interview Task Store. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;