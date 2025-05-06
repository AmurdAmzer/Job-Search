"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

export default function LoggedInHeader() {
  const router = useRouter();
  const [initial, setInitial] = useState("?");

  // ✅ Get user's name initial from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user?.name) {
        setInitial(user.name.charAt(0).toUpperCase());
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/");
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          <Image src="/logo.png" alt="Work Wing Logo" width={180} height={60} />
        </Link>
      </div>
      <nav className={styles.nav}>
        {/*<Link href="/account-settings">Account Settings</Link> */}
        <Link href="/favorites">Favorites</Link>
        <Link href="/jobs">Job Listings</Link>
        <Link href="/messages">Messages</Link>

        {/*Avatar + Logout Button Section */}
        <div className={styles.userSection}>
        <span onClick={handleLogout} className={styles.logoutBtn}>
            Log out
          </span>
          <div className={styles.avatar}>{initial}</div>
        </div>
      </nav>
    </header>
  );
}
