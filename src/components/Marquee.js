import styles from './Marquee.module.css';

const partners = [
    "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg",
    "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/e/e8/Tesla_logo.png",
    "https://upload.wikimedia.org/wikipedia/commons/c/ca/Sony_logo.svg",
];

export default function Marquee() {
    return (
        <section className={styles.marqueeSection}>
            <h2 className={styles.title}>Our Hiring Partners</h2>
            <div className={styles.marqueeContainer}>
                <div className={styles.marqueeTrack}>
                    {/* Double the list for seamless scrolling */}
                    {[...partners, ...partners].map((logo, index) => (
                        <div key={index} className={styles.logoWrapper}>
                            <img src={logo} alt={`Partner ${index}`} className={styles.logo} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
