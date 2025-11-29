import styles from './Media.module.css';

const mediaImages = [
    "https://appwarstechnologies.com/wp-content/uploads/2024/12/appwars-news-1.webp",
    "https://appwarstechnologies.com/wp-content/uploads/2024/12/appwars-news-2.webp",
    "https://appwarstechnologies.com/wp-content/uploads/2024/12/appwars-news-3.webp",
    "https://appwarstechnologies.com/wp-content/uploads/2024/12/appwars-news-4.webp",
    "https://appwarstechnologies.com/wp-content/uploads/2024/12/appwars-news-6.webp",
    "https://appwarstechnologies.com/wp-content/uploads/2024/12/appwars-news-7.webp"
];

export default function Media() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <h2 className={styles.title}>What Media Say?</h2>
                <div className={styles.grid}>
                    {mediaImages.map((src, index) => (
                        <div key={index} className={styles.card}>
                            <img src={src} alt={`Media Coverage ${index + 1}`} className={styles.image} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
