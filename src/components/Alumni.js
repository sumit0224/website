'use client';

import { useState, useEffect } from 'react';
import styles from './Alumni.module.css';

export default function Alumni() {
    const [alumni, setAlumni] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchAlumni() {
            try {
                // Assuming an API route exists or using a generic fetch if not
                // If /api/alumni doesn't exist, we might need to create it.
                // For now, let's try to fetch from /api/alumni
                const res = await fetch('/api/alumni');
                if (res.ok) {
                    const data = await res.json();
                    setAlumni(data);
                }
            } catch (error) {
                console.error("Failed to fetch alumni:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchAlumni();
    }, []);

    if (loading) {
        return null; // Or loading spinner
    }

    if (alumni.length === 0) {
        return null;
    }

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <h2 className={styles.title}>Our Successful Alumni</h2>
                <div className={styles.grid}>
                    {alumni.map((person) => (
                        <div key={person._id} className={styles.card}>
                            <div className={styles.avatar}>
                                {person.image ? (
                                    <img src={person.image} alt={person.name} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                                ) : (
                                    person.name.charAt(0)
                                )}
                            </div>
                            <h3 className={styles.name}>{person.name}</h3>
                            <p className={styles.role}>{person.role}</p>
                            <p className={styles.company}>{person.company}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
