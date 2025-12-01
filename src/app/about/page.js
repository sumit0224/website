import Link from 'next/link';
import { Target, Users, Lightbulb, Award, CheckCircle, ArrowRight } from 'lucide-react';
import styles from './page.module.css';

export default function About() {
    return (
        <div className={styles.container}>
            {/* Hero Section */}
            <section className={styles.hero}>
                <img src="/about-hero.png" alt="Appwars Technologies Office" className={styles.heroImage} />
                <div className={styles.heroOverlay}></div>
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>Empowering the Next Generation of Tech Leaders</h1>
                    <p className={styles.heroSubtitle}>
                        Bridging the gap between academia and industry with world-class training and mentorship.
                    </p>
                </div>
            </section>

            {/* Stats Section */}
            <section className={styles.statsSection}>
                <div className={styles.statsGrid}>
                    <div className={styles.statCard}>
                        <span className={styles.statNumber}>5000+</span>
                        <span className={styles.statLabel}>Students Trained</span>
                    </div>
                    <div className={styles.statCard}>
                        <span className={styles.statNumber}>50+</span>
                        <span className={styles.statLabel}>Expert Instructors</span>
                    </div>
                    <div className={styles.statCard}>
                        <span className={styles.statNumber}>100+</span>
                        <span className={styles.statLabel}>Corporate Partners</span>
                    </div>
                    <div className={styles.statCard}>
                        <span className={styles.statNumber}>95%</span>
                        <span className={styles.statLabel}>Placement Rate</span>
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className={styles.missionSection}>
                <div className={styles.missionContent}>
                    <h2 className={styles.sectionTitle}>Our Mission</h2>
                    <p className={styles.text}>
                        At Appwars Technologies, we believe that quality education is the foundation of a successful career.
                        Our mission is to democratize access to high-quality technical training, making it accessible to learners
                        from all backgrounds.
                    </p>
                    <p className={styles.text}>
                        We are more than just a training institute; we are a community of passionate learners and educators
                        dedicated to innovation and excellence. Registered with MSME, Govt. of India, and ISO certified,
                        we adhere to the highest standards of quality in everything we do.
                    </p>
                    <div style={{ marginTop: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.5rem' }}>
                            <CheckCircle size={20} color="var(--primary)" />
                            <span className={styles.text}>Industry-Relevant Curriculum</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.5rem' }}>
                            <CheckCircle size={20} color="var(--primary)" />
                            <span className={styles.text}>Hands-on Project Experience</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <CheckCircle size={20} color="var(--primary)" />
                            <span className={styles.text}>Dedicated Career Support</span>
                        </div>
                    </div>
                </div>
                <div className={styles.missionImageWrapper}>
                    <img src="/enroll-hero.png" alt="Students learning" className={styles.missionImage} />
                </div>
            </section>

            {/* Values Section */}
            <section className={styles.valuesSection}>
                <div className={styles.valuesContainer}>
                    <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
                        <h2 className={styles.sectionTitle}>Our Core Values</h2>
                        <p className={styles.text}>
                            These principles guide every decision we make and every interaction we have with our students and partners.
                        </p>
                    </div>

                    <div className={styles.valuesGrid}>
                        <div className={styles.valueCard}>
                            <div className={styles.iconWrapper}>
                                <Award size={32} />
                            </div>
                            <h3 className={styles.cardTitle}>Excellence</h3>
                            <p className={styles.cardText}>
                                We strive for perfection in our curriculum, teaching methods, and student support services.
                            </p>
                        </div>
                        <div className={styles.valueCard}>
                            <div className={styles.iconWrapper}>
                                <Lightbulb size={32} />
                            </div>
                            <h3 className={styles.cardTitle}>Innovation</h3>
                            <p className={styles.cardText}>
                                We constantly update our courses to reflect the latest industry trends and technologies.
                            </p>
                        </div>
                        <div className={styles.valueCard}>
                            <div className={styles.iconWrapper}>
                                <Users size={32} />
                            </div>
                            <h3 className={styles.cardTitle}>Community</h3>
                            <p className={styles.cardText}>
                                We foster a supportive environment where students can collaborate, learn, and grow together.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className={styles.ctaSection}>
                <div className={styles.ctaContent}>
                    <h2 className={styles.ctaTitle}>Ready to Start Your Journey?</h2>
                    <p className={styles.ctaText}>
                        Join thousands of successful graduates who have transformed their careers with Appwars Technologies.
                    </p>
                    <Link href="/enroll" className={styles.ctaButton}>
                        Enroll Now <ArrowRight size={20} style={{ verticalAlign: 'middle', marginLeft: '5px' }} />
                    </Link>
                </div>
            </section>
        </div>
    );
}
