// app/components/Header.js
import styles from '../styles/Home.module.css';
import Link from 'next/link'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>Group 2 Logo</div>
      <nav className={styles.nav}>
        <a href="#">Job Listings</a>
        <a href="#">My Profile</a>
        <a href="#">Resources</a>
      </nav>
      <Link href="/login" className={styles.signupBtn}>Log In</Link>
      <button className={styles.signupBtn}>Sign Up</button>
    </header>
  );
}