import type { Metadata } from 'next';
import PartnersHero from '@/components/partnership/PartnersHero';
import PartnersAdvantageGrid from '@/components/partnership/PartnersAdvantageGrid';
import PartnersSponsorsSection from '@/components/partnership/PartnersSponsorsSection';
import PartnersCtaFooter from '@/components/partnership/PartnersCtaFooter';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Official SRH Partnership 2025 | DropyHub Delivery Network',
  description:
    'DropyHub is proud to partner with Sunrisers Hyderabad for TATA IPL 2025. Empowering delivery partners with exclusive match tickets, branded merchandise, national visibility, and elite logistics support.',
};

export default function PartnershipPage() {
  return (
    <main className={styles.main}>
      <PartnersHero />
      <PartnersAdvantageGrid />
      <PartnersSponsorsSection />
      <PartnersCtaFooter />
    </main>
  );
}
