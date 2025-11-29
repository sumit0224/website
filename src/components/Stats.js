import styles from './Stats.module.css';

const statsData = [
    { number: '100%', label: 'Placement Assistance' },
    { number: '15', label: 'Students Per Batch' },
    { number: '10k+', label: 'Students Trained' },
    { number: '500+', label: 'Hiring Partners' },
];

export default function Stats() {
    return (
        <section className={styles.stats}>
            <div className={styles.grid}>
                {statsData.map((stat, index) => (
                    <div key={index} className={styles.card}>
                        <div className={styles.number}>{stat.number}</div>
                        <div className={styles.label}>{stat.label}</div>
                    </div>
                ))}
            </div>
        </section>
    );
}
