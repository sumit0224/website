import styles from './page.module.css';

export default function Placement() {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Placement Success Stories</h1>
                <p className={styles.subtitle}>Our students work at top tech companies around the world.</p>
            </div>

            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <div className={styles.statNumber}>500+</div>
                    <div className={styles.statLabel}>Students Placed</div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statNumber}>12 LPA</div>
                    <div className={styles.statLabel}>Average Package</div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statNumber}>45 LPA</div>
                    <div className={styles.statLabel}>Highest Package</div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statNumber}>150+</div>
                    <div className={styles.statLabel}>Hiring Partners</div>
                </div>
            </div>

            <h2 className={styles.title} style={{ textAlign: 'center', marginBottom: '3rem' }}>What Our Students Say</h2>

            <div className={styles.storiesGrid}>
                <div className={styles.storyCard}>
                    <div className={styles.studentInfo}>
                        <div className={styles.avatar} style={{ backgroundImage: 'url(https://randomuser.me/api/portraits/men/1.jpg)', backgroundSize: 'cover' }}></div>
                        <div>
                            <div className={styles.studentName}>Rahul Sharma</div>
                            <div className={styles.studentRole}>SDE at Google</div>
                        </div>
                    </div>
                    <p className={styles.quote}>&quot;EduPrime&apos;s curriculum is top-notch. The hands-on projects helped me crack the interview at Google.&quot;</p>
                </div>

                <div className={styles.storyCard}>
                    <div className={styles.studentInfo}>
                        <div className={styles.avatar} style={{ backgroundImage: 'url(https://randomuser.me/api/portraits/women/2.jpg)', backgroundSize: 'cover' }}></div>
                        <div>
                            <div className={styles.studentName}>Priya Patel</div>
                            <div className={styles.studentRole}>Frontend Dev at Amazon</div>
                        </div>
                    </div>
                    <p className={styles.quote}>&quot;The mentorship I received was invaluable. My mentor guided me through every step of the preparation.&quot;</p>
                </div>

                <div className={styles.storyCard}>
                    <div className={styles.studentInfo}>
                        <div className={styles.avatar} style={{ backgroundImage: 'url(https://randomuser.me/api/portraits/men/3.jpg)', backgroundSize: 'cover' }}></div>
                        <div>
                            <div className={styles.studentName}>Amit Singh</div>
                            <div className={styles.studentRole}>Data Scientist at Microsoft</div>
                        </div>
                    </div>
                    <p className={styles.quote}>&quot;The Data Science course is very comprehensive. I learned everything from Python to Deep Learning.&quot;</p>
                </div>
            </div>
        </div>
    );
}
