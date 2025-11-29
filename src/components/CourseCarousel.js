"use client";

import { useState, useRef } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './CourseCarousel.module.css';

export default function CourseCarousel({ courses }) {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        const { current } = scrollRef;
        if (current) {
            const scrollAmount = 300; // Adjust based on card width + gap
            if (direction === 'left') {
                current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            } else {
                current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }
    };

    return (
        <div className={styles.carouselWrapper}>
            <button
                className={`${styles.navBtn} ${styles.prevBtn}`}
                onClick={() => scroll('left')}
                aria-label="Previous courses"
            >
                <ChevronLeft size={24} />
            </button>

            <div className={styles.carouselTrack} ref={scrollRef}>
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
                            <span className={styles.arrow}>&rarr;</span>
                        </div>
                    </Link>
                ))}
            </div>

            <button
                className={`${styles.navBtn} ${styles.nextBtn}`}
                onClick={() => scroll('right')}
                aria-label="Next courses"
            >
                <ChevronRight size={24} />
            </button>
        </div>
    );
}
