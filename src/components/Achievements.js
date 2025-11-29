'use client';

import styles from './Achievements.module.css';

const awards = [
    "https://appwarstechnologies.com/wp-content/uploads/2024/11/appwars-technlogies-award-image-1-1.webp",
    "https://appwarstechnologies.com/wp-content/uploads/2024/11/appwars-technlogies-award-image-2.webp",
    "https://appwarstechnologies.com/wp-content/uploads/2024/11/appwars-technlogies-award-image-3.webp",
    "https://appwarstechnologies.com/wp-content/uploads/2025/05/award-image.jpg",
    "https://appwarstechnologies.com/wp-content/uploads/2024/11/appwars-technlogies-award-image-5.webp",
    "https://appwarstechnologies.com/wp-content/uploads/2024/11/appwars-technlogies-award-image-6.webp"
];

export default function Achievements() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <h2 className={styles.title}>Our Achievements</h2>
                <p className={styles.subtitle}>
                    A visual collection of our awards and recognitions - each achievement earned through dedication and excellence.
                </p>
                <div className={styles.gallery}>
                    {awards.map((src, index) => (
                        <div key={index} className={styles.imageWrapper}>
                            <img
                                src={src}
                                alt={`Award ${index + 1}`}
                                className={styles.image}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
