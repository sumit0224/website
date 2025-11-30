"use client";

import { useState } from 'react';
import { X } from 'lucide-react';
import Link from 'next/link';
import styles from './Flyer.module.css';

import { usePathname } from 'next/navigation';

export default function Flyer() {
    const pathname = usePathname();
    const [isVisible, setIsVisible] = useState(true);

    if (pathname.startsWith('/admin')) return null;

    if (!isVisible) return null;

    return (
        <div className={styles.flyer}>
            <div className={styles.content}>
                <span>
                    🚀 New Batch Starting Soon! Get <span style={{ fontWeight: 'bold' }}>Flat 20% OFF</span> on all courses.
                </span>
                <Link href="/enroll" className={styles.link}>
                    Enroll Now
                </Link>
            </div>
            <button
                className={styles.closeBtn}
                onClick={() => setIsVisible(false)}
                aria-label="Close flyer"
            >
                <X size={18} />
            </button>
        </div>
    );
}
