"use client";

import { useState, useEffect } from 'react';
import { Briefcase, Building, Calendar, ArrowRight, Award, TrendingUp } from 'lucide-react';
import Marquee from '@/components/Marquee';
import styles from './page.module.css';

export default function Placement() {
    const [placedStudents, setPlacedStudents] = useState([]);
    const [visibleCount, setVisibleCount] = useState(6);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        const fetchAlumni = async () => {
            try {
                const res = await fetch('/api/alumni');
                if (res.ok) {
                    const data = await res.json();
                    setPlacedStudents(data);
                }
            } catch (error) {
                console.error("Failed to fetch alumni:", error);
            }
        };
        fetchAlumni();
    }, []);

    const handleSeeAll = () => {
        setShowAll(!showAll);
        setVisibleCount(showAll ? 6 : placedStudents.length);
    };



    // Dummy Data for News
    const placementNews = [
        {
            id: 1,
            title: "Developer Mind School Achieves 95% Placement Rate for 2024 Batch",
            date: "November 15, 2024",
            excerpt: "We are proud to announce record-breaking placement numbers for our latest graduating batch across all disciplines."
        },
        {
            id: 2,
            title: "New Hiring Partnership with Top FinTech Companies",
            date: "October 28, 2024",
            excerpt: "Leading FinTech firms have joined our recruitment drive, opening up exciting opportunities for our Data Science students."
        },
        {
            id: 3,
            title: "Alumni Success Story: From Non-Tech to Senior Developer",
            date: "October 10, 2024",
            excerpt: "Read the inspiring journey of our student who transitioned from a sales role to a Senior Developer at a Fortune 500 company."
        }
    ];

    return (
        <div className={styles.container}>
            {/* Hero Section */}
            <section className={styles.hero}>
                <img src="/placement-hero.png" alt="Placement Success" className={styles.heroImage} />
                <div className={styles.heroOverlay}></div>
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>Your Career Takes Flight Here</h1>
                    <p className={styles.heroSubtitle}>
                        Join a community of achievers. Our dedicated placement cell ensures you land your dream job at top-tier companies.
                    </p>
                </div>
            </section>

            {/* Placed Students Section */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Our Placed Students</h2>
                <div className={styles.studentsGrid}>
                    {placedStudents.slice(0, visibleCount).map((student) => (
                        <div key={student._id} className={styles.studentCard}>
                            <div className={styles.studentImageWrapper}>
                                <img src={student.image || `https://ui-avatars.com/api/?name=${student.name}&background=random&size=200`} alt={student.name} className={styles.studentImage} />
                            </div>
                            <div className={styles.studentInfo}>
                                <h3 className={styles.studentName}>{student.name}</h3>
                                <p className={styles.studentRole}>{student.role}</p>
                                <div className={styles.studentCompany}>
                                    <Building size={16} />
                                    <span>{student.company}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {placedStudents.length > 6 && (
                    <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                        <button onClick={handleSeeAll} className={styles.seeAllBtn}>
                            {showAll ? 'Show Less' : 'See All Alumni'}
                        </button>
                    </div>
                )}
            </section>

            {/* Placement Partners Section */}
            <Marquee />

            {/* Placement News Section */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Placement News & Updates</h2>
                <div className={styles.newsGrid}>
                    {placementNews.map((news) => (
                        <div key={news.id} className={styles.newsCard}>
                            <div className={styles.newsDate}>
                                <Calendar size={16} />
                                <span>{news.date}</span>
                            </div>
                            <h3 className={styles.newsTitle}>{news.title}</h3>
                            <p className={styles.newsExcerpt}>{news.excerpt}</p>
                            <a href="#" className={styles.readMore}>
                                Read Full Story <ArrowRight size={16} />
                            </a>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
