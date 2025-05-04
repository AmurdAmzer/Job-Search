'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; //for redirect
import styles from './Signup.module.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function SignUpPage() {
  const router = useRouter(); //Hook inside the component
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Something went wrong');
        return;
      }

      //Save user and token
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data));

      //Redirect to /jobs
      router.push('/jobs');
    } catch (err) {
      setError('Network error. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <div className={styles.formContainer}>
          <h1 className={styles.title}>Sign Up</h1>
          <p className={styles.subtitle}>Create an account to manage your job search</p>
          <form onSubmit={handleSubmit}>
            <input
              className={styles.input}
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <input
              className={styles.input}
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <input
              className={styles.input}
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
            <button type="submit" className={styles.signupBtn}>Sign Up</button>
            {error && <p className={styles.errorMessage}>{error}</p>}
          </form>
          <div className={styles.footerLinks}>
            <p>Already have an account? <a href="/login">Log In</a></p>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <div className={styles.placeholder}>📄</div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
