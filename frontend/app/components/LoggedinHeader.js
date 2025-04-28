'use client';

import Link from 'next/link';
import styles from '../styles/Home.module.css'; // adjust if your path is different
import Image from 'next/image';

export default function LoggedInHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
      <Link href="/">
          <Image src="/logo.png" alt="Work Wing Logo" width={180} height={60} />
        </Link>
      </div>
      <nav className={styles.nav}>
        <Link href="/account-settings">
          Account Settings
        </Link>
        <Link href="/dashboard">
          Dashboard
        </Link>
        <Link href="/jobs">
          Job Listings
        </Link>
        <Link href="/messages">
          Messages
        </Link>
        <Link href="/logout">
          Logout
        </Link>
      </nav>
    </header>
  );
}
