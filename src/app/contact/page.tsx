import type { Metadata } from 'next';
import ContactHeroForm from '@/components/contact/ContactHeroForm';
import ContactFaqSection from '@/components/contact/ContactFaqSection';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Contact Us & Apply Now | DropyHub Delivery Network',
  description:
    'Start your journey with DropyHub today for free. Register as a delivery partner or warehouse associate with zero fees, vehicle rental options, and instant earnings.',
};

export default function ContactPage() {
  return (
    <main className={styles.main}>
      <ContactHeroForm />
      <ContactFaqSection />
    </main>
  );
}
