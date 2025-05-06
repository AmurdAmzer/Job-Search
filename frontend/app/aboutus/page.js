// app/aboutus/page.js

import Header from '../components/Header';
import Footer from '../components/Footer';
import SplitSection from '../components/SplitSection';
import styles from '../styles/Home.module.css';

export default function AboutUsPage() {
  return (
    <>
      <Header />

      <main className={styles.aboutPage}>
        {/* Hero Section */}
        <section className={styles.aboutHero}>
          <h1>About Us</h1>
          <p>Helping you take control of your job search journey.</p>
        </section>

        {/* Our Story using SplitSection */}
        <SplitSection
          title="Our Story"
          text="Founded in 2024, Work Wing was created with a simple mission: to simplify and empower the job search process. Our founders, a team of career coaches and technologists, realized there was a better way to navigate the complicated job market. That's when the idea for an automated, real-time job search management system was born."
          imgSrc="/founders.jpg" 
          reverse={false}
        />

        {/* What We Do Section */}
        <section className={styles.aboutContent}>
          <h2>What We Do</h2>
          <p>
            Our platform connects directly with LinkedIn to gather job listings and relevant data efficiently.
            After registering and submitting a resume, users receive tailored job recommendations that match their skills and career ambitions.
          </p>
          <p>
            Through a personalized dashboard, users can monitor the status of all applications—saved, in progress, received, rejected, or pending—
            ensuring that no opportunity is missed. The system sends real-time alerts, interview preparation materials, and customized advice,
            offering an end-to-end solution for job seekers.
          </p>
        </section>

        {/* Our Mission Section */}
        <section className={styles.aboutContent}>
          <h2>Our Mission</h2>
          <p>
            We believe that every job seeker deserves tools that work as hard as they do.
            Work Wing is committed to helping individuals take charge of their employment journey
            with smart tracking, real-time insights, and personalized support.
          </p>
        </section>

        {/* Join Us Section */}
        <section className={styles.aboutContent}>
          <h2>Join Us</h2>
          <p>
            Whether you're looking for your first role or aiming for your dream career move,
            Work Wing is here to guide and support you every step of the way.
          </p>
        </section>
      </main>

      <Footer />
    </>
  );
}
