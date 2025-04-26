// app/components/Header.js
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import Image from 'next/image';


export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
      <Link href="/">
          <Image src="/logo.png" alt="Work Wing Logo" width={180} height={60} />
        </Link>
      </div>
      <nav className={styles.nav}>
        <a href="#">About Us</a>
        <a href="#">My Profile</a>
        <a href="#">Resources</a>
      </nav>
      <Link href="/login" className={styles.signupBtn}>Log In</Link>
      {/* <button className={styles.signupBtn}>Sign Up</button> */}
    </header>
  );
}