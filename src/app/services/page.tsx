import type { Metadata } from 'next';
import ServicesHero from '@/components/services/ServicesHero';
import ServicesProcess from '@/components/services/ServicesProcess';
import ServicesSupportGrid from '@/components/services/ServicesSupportGrid';
import ServicesCtaFooter from '@/components/services/ServicesCtaFooter';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Our Services | Delivery Support for Every Shift | DropyHub',
  description:
    'End-to-end professional support, EV bike access, hostel accommodation, weekly performance bonuses and voucher programmes for DropyHub delivery partners.',
};

export default function ServicesPage() {
  return (
    <main className={styles.main}>
      <ServicesHero />
      <ServicesProcess />
      <ServicesSupportGrid />
      <ServicesCtaFooter />
    </main>
  );
}
