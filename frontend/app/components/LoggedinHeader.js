'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation'; // ✅ ADDED for redirect
import styles from '../styles/Home.module.css';
import Image from 'next/image';

export default function LoggedInHeader() {
  const router = useRouter(); // ✅ Hook inside the component

  const handleLogout = () => {
    localStorage.removeItem('token');     // ✅ Clear user session
    localStorage.removeItem('user');
    router.push('/');                     // ✅ Redirect to homepage
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          <Image src="/logo.png" alt="Work Wing Logo" width={180} height={60} />
        </Link>
      </div>
      <nav className={styles.nav}>
        <Link href="/account-settings">Account Settings</Link>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/jobs">Job Listings</Link>
        <Link href="/messages">Messages</Link>
        
        {/* ✅ CHANGED: real logout handler instead of link */}
        <button onClick={handleLogout} style={{
          background: 'none',
          border: 'none',
          color: 'inherit',
          cursor: 'pointer',
          font: 'inherit',
          padding: 0,
          margin: 0
        }}>
          Logout
        </button>
      </nav>
    </header>
  );
}
