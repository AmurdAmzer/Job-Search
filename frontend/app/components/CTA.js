// app/components/CTA.js
import styles from '../styles/Home.module.css';
import SignUpButton from './SignUpButton';

export default function CTA() {
  return (
    <section className={styles.ctaSection}>
      <h2>Take Control of Your Job Search</h2>
      <p>Start using your personalized dashboard today.</p>
      <SignUpButton className={styles.ctaButton} />
    </section>
  );
}