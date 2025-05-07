
"use client";

import { useState } from "react"; //added for form state
import { useRouter } from "next/navigation"; //Moved higher
import { signIn } from "next-auth/react";
import Image from "next/image";
import Footer from "../components/Footer";
import Header from "../components/Header";
import styles from "./Login.module.css";
import SignUpButton from '../components/SignUpButton';

export default function LoginPage() {
  const router = useRouter(); 
  const [email, setEmail] = useState(''); // state added
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  //login handler
  const handleLogin = async () => {
    setError('');
    try {
      const res = await fetch('https://job-search-1-k9sx.onrender.com/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Login failed');
        return;
      }

      //Save user and token
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data));

      // Redirect to job listings page
      router.push('/jobs');
    } catch (err) {
      setError('Network error. Please try again.');
    }
  };

  return (
    <>
      <Header />

      <div className={styles.container}>
        <main className={styles.main}>
          <div className={styles.formContainer}>
            <h1 className={styles.title}>Log In</h1>
            <p className={styles.subtitle}>
            Welcome back! Log in to continue your job search journey.
            </p>

            {/* input now uses state */}
            <input
              type="email"
              placeholder="Email"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* button calls login */}
            <button onClick={handleLogin} className={styles.loginBtn}>
              Log in
            </button>

            {/* Show login error if present */}
            {error && <p style={{ color: 'red', marginTop: '0.5rem' }}>{error}</p>}

            <div className={styles.socialLogins}>
              <SignUpButton className={styles.signupBtn} />
              <button onClick={() => signIn("google")}>
                Log in with Google
              </button>
              <button onClick={() => signIn("linkedin")}>
                Log in with LinkedIn
              </button>
            </div>

            <div className={styles.footerLinks}>
              <a href="#">Forgot your password?</a>
              <p>
                Don’t have an account? <a href="/signup">Sign up</a>
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
