// app/login/page.js
"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import Footer from "../components/Footer";
import Header from "../components/Header";
import styles from "./Login.module.css";

export default function LoginPage() {
  return (
    <>
      <Header />

      <div className={styles.container}>
        <main className={styles.main}>
          <div className={styles.formContainer}>
            <h1 className={styles.title}>Log In</h1>
            <p className={styles.subtitle}>
              Lorem ipsum dolor sit amet adipiscing elit.
            </p>
            <input type="email" placeholder="Email" className={styles.input} />
            <input
              type="password"
              placeholder="Password"
              className={styles.input}
            />
            <button className={styles.loginBtn}>Log in</button>

            <div className={styles.socialLogins}>
              <button onClick={() => signIn("google")}>
                Log in with Google
              </button>
              <button onClick={() => signIn("linkedin")}>
                Log in with LinkedIn
              </button>
              {/*<button>Log in with Apple</button> */}
            </div>

            <div className={styles.footerLinks}>
              <a href="#">Forgot your password?</a>
              <p>
                Don’t have an account? <a href="#">Sign up</a>
              </p>
            </div>
          </div>

          <div className={styles.imageContainer}>
            <Image
              src={"/shake.jpg"}
              width={600}
              height={400}
              className="shake"
              alt="Login Illustration"
            />
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
}
