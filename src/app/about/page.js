import styles from './page.module.css';

export default function About() {
    return (
        <div className={styles.container}>
            <section className={styles.section}>
                <h1 className={styles.title}>About Appwars Technologies</h1>
                <p className={styles.text}>
                    Appwars Technologies is a leading IT training institute dedicated to bridging the gap between academia and industry.
                    We believe that quality education should be accessible to everyone, everywhere.
                    Our mission is to empower learners with the skills they need to succeed in the digital age.
                    We are registered with MSME, Govt. of India, approved by the Ministry of Corporate Affairs, & certified by ISO.
                </p>
            </section>

            <section className={styles.section}>
                <h2 className={styles.title}>Our Values</h2>
                <div className={styles.grid}>
                    <div className={styles.card}>
                        <h3 className={styles.cardTitle}>Excellence</h3>
                        <p className={styles.cardText}>We strive for excellence in everything we do, from our curriculum to our mentorship.</p>
                    </div>
                    <div className={styles.card}>
                        <h3 className={styles.cardTitle}>Innovation</h3>
                        <p className={styles.cardText}>We constantly innovate to provide the best learning experience for our students.</p>
                    </div>
                    <div className={styles.card}>
                        <h3 className={styles.cardTitle}>Integrity</h3>
                        <p className={styles.cardText}>We believe in honesty, transparency, and ethical conduct in all our interactions.</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
