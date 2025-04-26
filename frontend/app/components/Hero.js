import Image from 'next/image';
import styles from '../styles/Home.module.css';

export default function Hero() {
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroBackground}>
        <Image src="/hero.png" alt="Job Search" fill style={{ objectFit: 'cover' }} />
      </div>
      <div className={styles.heroContent}>
        <h1>Revolutionize Your Job Search Experience Today</h1>
        <p>Smart tools to help you find, apply, and track jobs better.</p>
        <button className={styles.ctaButton}>Get Started</button>
      </div>
    </section>
  );
}
