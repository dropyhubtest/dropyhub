import type { Metadata } from 'next';
import PageRails from '@/components/layout/PageRails';
import WarehouseHero from '@/components/warehouse/WarehouseHero';
import WarehouseFeatures from '@/components/warehouse/WarehouseFeatures';
import WarehouseShuttle from '@/components/warehouse/WarehouseShuttle';
import WarehouseApplicationForm from '@/components/warehouse/WarehouseApplicationForm';
import WarehouseCtaFooter from '@/components/warehouse/WarehouseCtaFooter';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Warehouse Workforce, Simplified | DropyHub Logistics',
  description:
    'Connecting leading logistics businesses like Flipkart and Amazon with skilled warehouse talent, dedicated free shuttle transportation, and reliable workforce solutions.',
};

export default function WarehousePage() {
  return (
    <main className={styles.main}>
      <PageRails />
      <WarehouseHero />
      <WarehouseFeatures />
      <WarehouseShuttle />
      <WarehouseApplicationForm />
      <WarehouseCtaFooter />
    </main>
  );
}
