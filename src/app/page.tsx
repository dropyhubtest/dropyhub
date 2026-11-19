import Hero from "@/components/home/Hero";
import StatsWhySection from "@/components/home/StatsWhySection";
import EarningsEstimator from "@/components/home/EarningsEstimator";
import AboutSection from "@/components/home/AboutSection";
import TrustPartnersTestimonials from "@/components/home/TrustPartnersTestimonials";
import FaqFooterSection from "@/components/home/FaqFooterSection";
import PageRails from "@/components/layout/PageRails";
import MotorcycleScroll from "@/components/home/MotorcycleScroll";
import MobileBikeScroll from "@/components/home/MobileBikeScroll";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <PageRails />
            <MotorcycleScroll />
            <MobileBikeScroll />
      <Hero />
      <StatsWhySection />
      <EarningsEstimator />
      <AboutSection />
      <TrustPartnersTestimonials />
      <FaqFooterSection />
    </main>
  );
}
