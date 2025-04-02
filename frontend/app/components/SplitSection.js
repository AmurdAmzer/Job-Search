import Image from 'next/image';
import styles from '../styles/Home.module.css';

export default function SplitSection({ title, text, imgSrc, reverse }) {
  return (
    <section className={styles.splitSection} style={{ flexDirection: reverse ? 'row-reverse' : 'row' }}>
      <div className={styles.splitImage}>
        <Image src={imgSrc} alt={title} fill style={{ objectFit: 'cover' }} />
      </div>
      <div className={styles.splitText}>
        <h2>{title}</h2>
        <p>{text}</p>
        <button className={styles.ctaButton}>Learn More</button>
      </div>
    </section>
  );
}