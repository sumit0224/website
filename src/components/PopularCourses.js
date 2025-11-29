'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './PopularCourses.module.css';

export default function PopularCourses() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCourses() {
            try {
                const res = await fetch('/api/courses');
                if (res.ok) {
                    const data = await res.json();
                    // Limit to 3 courses for the popular section
                    setCourses(data.slice(0, 3));
                }
            } catch (error) {
                console.error("Failed to fetch popular courses:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchCourses();
    }, []);

    if (loading) {
        return null; // Or a loading spinner
    }

    if (courses.length === 0) {
        return null;
    }

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <h2 className={styles.title}>Popular Courses</h2>
                <div className={styles.grid}>
                    {courses.map((course) => (
                        <Link key={course._id} href={`/courses/${course.id}`} className={styles.card}>
                            <div className={styles.imageWrapper}>
                                <img
                                    src={course.image || 'https://via.placeholder.com/300x200?text=Course+Image'}
                                    alt={course.title}
                                    className={styles.courseImage}
                                />
                            </div>
                            <div className={styles.cardContent}>
                                <h3>{course.title}</h3>
                                <p className={styles.level}>{course.level}</p>
                                <p className={styles.duration}>{course.duration}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
