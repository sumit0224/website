
import Link from 'next/link';
import styles from './page.module.css';
import dbConnect from '@/lib/db';
import Course from '@/models/Course';

async function getCourses() {
    await dbConnect();
    // Fallback if DB connection fails or no URI
    if (!process.env.MONGODB_URI) return [];

    try {
        const courses = await Course.find({}).lean();
        return courses.map(course => ({
            ...course,
            _id: course._id.toString(),
            createdAt: course.createdAt?.toISOString(),
            updatedAt: course.updatedAt?.toISOString()
        }));
    } catch (error) {
        console.error("Failed to fetch courses:", error);
        return [];
    }
}

export default async function Courses() {
    const courses = await getCourses();

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Our Courses</h1>
            <div className={styles.grid}>
                {courses.length === 0 ? (
                    <p style={{ textAlign: 'center', gridColumn: '1/-1' }}>No courses available at the moment.</p>
                ) : (
                    courses.map((course) => (
                        <div key={course._id} className={styles.card}>
                            <img src={course.image} alt={course.title} className={styles.image} />
                            <div className={styles.content}>
                                <h2 className={styles.courseTitle}>{course.title}</h2>
                                <p className={styles.description}>{course.description}</p>
                                <div className={styles.meta}>
                                    <span>{course.duration}</span>
                                    <span>{course.level}</span>
                                </div>
                                <Link href={`/courses/${course.id}`} className={styles.btn}>
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
