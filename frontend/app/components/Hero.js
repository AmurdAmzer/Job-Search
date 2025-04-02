// app/components/Hero.js
import Image from 'next/image';
import styles from '../styles/Home.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroText}>
        <h1>Revolutionize Your Job Search Experience Today</h1>
        <p>Smart tools to help you find, apply, and track jobs better.</p>
        <button className={styles.ctaButton}>Get Started</button>
      </div>
      <div className={styles.heroImage}>
        <Image src="/hero.png" alt="Job Search" fill style={{ objectFit: 'cover' }} />
      </div>
    </section>
  );
}

