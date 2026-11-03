import type { Metadata } from 'next';
import PageRails from '@/components/layout/PageRails';
import AboutHero from '@/components/about/AboutHero';
import AboutStoryProblem from '@/components/about/AboutStoryProblem';
import AboutStatsPillars from '@/components/about/AboutStatsPillars';
import AboutValuesTimeline from '@/components/about/AboutValuesTimeline';
import AboutPartnerBenefits from '@/components/about/AboutPartnerBenefits';
import AboutCtaFooter from '@/components/about/AboutCtaFooter';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'About Us | DropyHub - Beyond Delivery',
  description:
    'DropyHub is the partner-first platform managing a captive fleet network of delivery executives across 12+ Indian cities with EV vehicles, financial assistance, and career pathways.',
};

export default function AboutPage() {
  return (
    <main className={styles.main}>
      <PageRails />
      <AboutHero />
      <AboutStoryProblem />
      <AboutStatsPillars />
      <AboutValuesTimeline />
      <AboutPartnerBenefits />
      <AboutCtaFooter />
    </main>
  );
}
