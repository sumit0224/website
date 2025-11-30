"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import styles from './Navbar.module.css';
import { navLinks } from '@/data/siteData';

import { usePathname } from 'next/navigation';

export default function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    if (pathname.startsWith('/admin')) return null;

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <nav className={styles.navbar}>
            <Link href="/" className={styles.logo}>
                <Image
                    src="https://appwarstechnologies.com/wp-content/uploads/2022/12/appwars-logo.webp"
                    alt="Appwars Technologies Logo"
                    width={150}
                    height={50}
                    priority
                    style={{ height: 'auto', width: 'auto' }}
                />
            </Link>

            <div className={styles.navLinks}>
                {navLinks.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={`${styles.navLink} ${link.label === 'Enroll Now' ? styles.cta : ''}`}
                    >
                        {link.label}
                    </Link>
                ))}
                <Link href="/counseling" className={styles.ctaBtn}>
                    Book a Demo
                </Link>
            </div>

            <button className={styles.mobileMenuBtn} onClick={toggleMenu} aria-label="Toggle menu">
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {isOpen && (
                <div className={styles.mobileMenu}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`${styles.navLink} ${link.label === 'Enroll Now' ? styles.cta : ''}`}
                            onClick={toggleMenu}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Link href="/counseling" className={styles.ctaBtn} onClick={toggleMenu}>
                        Book a Demo
                    </Link>
                </div>
            )}
        </nav>
    );
}
