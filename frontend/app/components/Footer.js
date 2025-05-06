// app/components/Footer.js
import Image from 'next/image'; // <-- import Image
import styles from '../styles/Home.module.css';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop}>
        <div>
          <Image
            src="/logo.png"  //loads your logo from /public/logo.png
            alt="Work Wing Logo" 
            width={150} 
            height={50} 
          />
        </div>
        <div>
          <h4>Quick Links</h4>
          <ul>
          <li><Link href="/aboutus">About</Link></li>
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
