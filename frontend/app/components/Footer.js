// app/components/Footer.js
import styles from '../styles/Home.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop}>
        <div>
          <h4>Group 2 Logo</h4>
        </div>
        <div>
          <h4>Quick Links</h4>
          <ul>
            <li>About</li>
            <li>Blog</li>
            <li>Support</li>
          </ul>
        </div>
        <div>
          <h4>Connect</h4>
          <ul>
            <li>Facebook</li>
            <li>Instagram</li>
            <li>LinkedIn</li>
          </ul>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>© 2025 Group 2. All rights reserved. | Privacy | Terms</p>
      </div>
    </footer>
  );
}
