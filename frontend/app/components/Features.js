// app/components/Features.js
import styles from '../styles/Home.module.css';

export default function Features() {
  return (
    <section className={styles.features}>
      <h2>Expand Your Job Search with Intelligent Automation</h2>
      <div className={styles.featureGrid}>
        <div>
          <h3>🔍 Smart Job Matching</h3>
          <p>Matches you with jobs based on your goals and skills.</p>
        </div>
        <div>
          <h3>⚙️ Auto Apply Tools</h3>
          <p>Apply to multiple listings instantly with one click.</p>
        </div>
        <div>
          <h3>📩 Custom Alerts</h3>
          <p>Get notified the moment a relevant job is posted.</p>
        </div>
      </div>
    </section>
  );
}