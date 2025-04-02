import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import SplitSection from './components/SplitSection';
import CTA from './components/CTA';
import Footer from './components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Features />
      <SplitSection
        title="Stay Organized with Application Tracking"
        text="Monitor all your applications in one place..."
        imgSrc="/tracker.png"
        reverse={false}
      />
      <SplitSection
        title="Never Miss an Opportunity Again"
        text="Get real-time job alerts tailored to your interests."
        imgSrc="/alerts.png"
        reverse={true}
      />
      <CTA />
      <Footer />
    </>
  );
}
