import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import styles from './Hero.module.css';

export default function Hero() {
    return (
        <section className={styles.hero}>
            <div className={styles.content}>
                <h1 className={styles.title}>
                    Best IT Training Institute in Noida
                </h1>
                <p className={styles.subtitle}>
                    India’s fastest-growing IT training company is registered with MSME, Govt. of India, approved by the Ministry of Corporate Affairs, & certified by ISO. Winner of the CSI Excellence Award 2024.
                </p>
                <div className={styles.actions}>
                    <Link href="/courses" className={styles.primaryBtn}>
                        Explore Courses
                    </Link>
                    <Link href="/enroll" className={styles.secondaryBtn}>
                        Enquiry Now <ArrowRight size={20} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: '0.5rem' }} />
                    </Link>
                </div>
            </div>
        </section>
    );
}
