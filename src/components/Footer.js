"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
    const year = new Date().getFullYear();

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
                    <h3>Our Courses</h3>
                    <div className={styles.links}>
                        <Link href="/data-science-ai" className={styles.link}>Data Science & AI</Link>
                        <Link href="/data-analytics" className={styles.link}>Data Analytics</Link>
                        <Link href="/mern-full-stack" className={styles.link}>MERN Full Stack Development</Link>
                        <Link href="/java-full-stack" className={styles.link}>Java Full Stack Development</Link>
                        <Link href="/python-full-stack" className={styles.link}>Python Full Stack Development</Link>
                        
                    </div>
                </div>

                <div className={styles.column}>
                    <h3>Contact Us</h3>
                    <div className={styles.links}>
                        <div className={styles.link} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Mail size={18} />
                            <Link href="mailto:info@appwarstechnologies.com">info@appwarstechnologies.com</Link>
                        </div>
                        <div className={styles.link} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Phone size={18} />
                            <Link href="tel:+919911169001">+91-9911169001</Link>
                            <Link href="tel:+918743019452">+91-8743019452</Link>
                        </div>
                        <div className={styles.link} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <MapPin size={46} />
                            <Link href="https://www.google.com/maps/place/appwarstechnologies">C-20, 1st Floor, Noida Sector 2, U.P. - 201301 ( Near Nirulas Hotel and Noida Sector - 15 Metro )</Link>
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
                <p>Designed and Developed by <a href="tel:+919310513770" target="_blank" rel="noopener noreferrer">Sumit Gautam</a></p>
            </div>
        </footer>
    );
}
