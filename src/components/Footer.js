"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
    const [year, setYear] = useState(2025);

    useEffect(() => {
        setYear(new Date().getFullYear());
    }, []);

    return (
        <footer className={styles.footer}>
            <div className={styles.content}>
                <div className={styles.column}>
                    <Link href="/" className={styles.logo}>
                        <img src="https://appwarstechnologies.com/wp-content/uploads/2022/12/appwars-logo.webp" alt="Appwars Technologies Logo" />
                    </Link>
                    <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
                        Empowering students with industry-ready skills and placement assistance. Join us to shape your future.
                    </p>
                </div>

                <div className={styles.column}>
                    <h3>Our Services</h3>
                    <div className={styles.links}>
                        <Link href="/summer-training" className={styles.link}>Summer Internship</Link>
                        <Link href="/winter-training" className={styles.link}>Winter Training</Link>
                        <Link href="/industrial-training" className={styles.link}>Industrial Training</Link>
                        <Link href="/corporate-training" className={styles.link}>Corporate Training</Link>
                    </div>
                </div>

                <div className={styles.column}>
                    <h3>Contact Us</h3>
                    <div className={styles.links}>
                        <div className={styles.link} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Mail size={18} /> info@appwarstechnologies.com
                        </div>
                        <div className={styles.link} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Phone size={18} /> +91-9911169001
                        </div>
                        <div className={styles.link} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <MapPin size={18} /> B-3, Sector 2, Noida, UP
                        </div>
                    </div>
                </div>

                <div className={styles.column}>
                    <h3>Follow Us</h3>
                    <div className={styles.socials}>
                        <a href="https://www.facebook.com/appwarstechnologies" className={styles.socialIcon} target="_blank" rel="noopener noreferrer"><Facebook size={24} /></a>
                        <a href="https://twitter.com/appwarstech" className={styles.socialIcon} target="_blank" rel="noopener noreferrer"><Twitter size={24} /></a>
                        <a href="https://www.instagram.com/appwarstechnologies" className={styles.socialIcon} target="_blank" rel="noopener noreferrer"><Instagram size={24} /></a>
                        <a href="https://www.linkedin.com/company/appwars-technologies" className={styles.socialIcon} target="_blank" rel="noopener noreferrer"><Linkedin size={24} /></a>
                    </div>
                </div>
            </div>

            <div className={styles.bottom}>
                <p>&copy; {year} Appwars Technologies. All rights reserved.</p>
            </div>
        </footer>
    );
}
