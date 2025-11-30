import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Clock, BarChart, BookOpen, CheckCircle } from 'lucide-react';
import styles from './page.module.css';
import dbConnect from '@/lib/db';
import Course from '@/models/Course';
import Breadcrumbs from '@/components/Breadcrumbs';
import GoBackButton from '@/components/GoBackButton';

async function getCourse(id) {
    await dbConnect();
    const course = await Course.findOne({ id: id }).lean();
    if (!course) return null;
    return {
        ...course,
        _id: course._id.toString(),
        createdAt: course.createdAt?.toISOString(),
        updatedAt: course.updatedAt?.toISOString()
    };
}

export async function generateStaticParams() {
    try {
        await dbConnect();
        const courses = await Course.find({}, { id: 1 }).lean();
        return courses.map((course) => ({
            id: course.id,
        }));
    } catch (error) {
        console.warn('Database connection failed during static generation, falling back to on-demand rendering:', error.message);
        return [];
    }
}

export default async function CourseDetails({ params }) {
    const { id } = await params;
    const course = await getCourse(id);

    if (!course) {
        notFound();
    }

    return (
        <div className={styles.container}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Breadcrumbs items={[{ label: 'Courses', href: '/courses' }, { label: course.title, href: '#' }]} />
                <GoBackButton />
            </div>

            {/* Hero Section */}
            <div className={styles.hero}>
                <div className={styles.heroContent}>
                    <h1 className={styles.title}>{course.title}</h1>
                    <p className={styles.description}>{course.description}</p>
                    <div className={styles.meta}>
                        <div className={styles.metaItem}>
                            <Clock size={20} />
                            <span>{course.duration}</span>
                        </div>
                        <div className={styles.metaItem}>
                            <BarChart size={20} />
                            <span>{course.level}</span>
                        </div>
                    </div>
                    <div className={styles.priceContainer}>
                        {course.actualPrice && (
                            <span className={styles.actualPrice}>₹{course.actualPrice}</span>
                        )}
                        {course.discountedPrice && (
                            <span className={styles.discountedPrice}>₹{course.discountedPrice}</span>
                        )}
                    </div>
                </div>
                <div className={styles.imageWrapper}>
                    <img src={course.image} alt={course.title} className={styles.image} />
                </div>
            </div>

            {/* Main Content Grid */}
            <div className={styles.contentGrid}>
                <div className={styles.mainContent}>
                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>Course Syllabus</h2>
                        <ul className={styles.syllabusList}>
                            {course.syllabus.map((topic, index) => (
                                <li key={index} className={styles.syllabusItem}>
                                    <span className={styles.syllabusIndex}>{index + 1}</span>
                                    <span>{topic}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Sidebar */}
                <aside className={styles.sidebar}>
                    <h3 className={styles.sidebarTitle}>Course Details</h3>
                    <ul className={styles.sidebarList}>
                        <li className={styles.sidebarItem}>
                            <span>Duration</span>
                            <strong>{course.duration}</strong>
                        </li>
                        <li className={styles.sidebarItem}>
                            <span>Level</span>
                            <strong>{course.level}</strong>
                        </li>
                        <li className={styles.sidebarItem}>
                            <span>Mode</span>
                            <strong>Online / Offline</strong>
                        </li>
                        <li className={styles.sidebarItem}>
                            <span>Certificate</span>
                            <strong>Yes</strong>
                        </li>
                    </ul>
                    <Link href="/enroll" className={styles.enrollBtn}>
                        Enroll Now
                    </Link>
                </aside>
            </div>
        </div>
    );
}
