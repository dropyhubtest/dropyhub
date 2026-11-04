import type { Metadata } from 'next';
import BenefitsHero from '@/components/benefits/BenefitsHero';
import BenefitsPartnerGrid from '@/components/benefits/BenefitsPartnerGrid';
import BenefitsPrograms from '@/components/benefits/BenefitsPrograms';
import BenefitsStatsTestimonials from '@/components/benefits/BenefitsStatsTestimonials';
import BenefitsCtaFooter from '@/components/benefits/BenefitsCtaFooter';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Partner Benefits | More Benefits. More Possibilities | DropyHub',
  description:
    'EV bike access, hostel accommodation, weekly performance bonuses, comprehensive insurance and career growth pathways for delivery executives with DropyHub.',
};

export default function BenefitsPage() {
  return (
    <main className={styles.main}>
      <BenefitsHero />
      <BenefitsPartnerGrid />
      <BenefitsPrograms />
      <BenefitsStatsTestimonials />
      <BenefitsCtaFooter />
    </main>
  );
}
