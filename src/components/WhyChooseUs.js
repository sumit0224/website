import { BookOpen, Users, Award, Briefcase, FileText, Monitor } from 'lucide-react';
import styles from './WhyChooseUs.module.css';

const features = [
    {
        icon: <Monitor size={32} />,
        title: 'Hybrid Mode Class',
        description: 'Learn flexibly with combined online and offline classroom training sessions.'
    },
    {
        icon: <Award size={32} />,
        title: 'Internship Certificate',
        description: 'Receive an internship certificate for hands-on industry project experience.'
    },
    {
        icon: <Briefcase size={32} />,
        title: '100% Placement Assistance',
        description: 'Complete placement support provided until you secure a suitable job.'
    },
    {
        icon: <FileText size={32} />,
        title: 'CV Building & ATS Score',
        description: 'Optimize your resume for ATS and improve shortlisting chances significantly.'
    },
    {
        icon: <Users size={32} />,
        title: 'Mock Interviews',
        description: 'Practice with mock interviews to boost real interview performance confidence.'
    },
    {
        icon: <Users size={32} />,
        title: '15 Students Per Batch',
        description: 'Small batches ensure personalized attention and better student-teacher interaction.'
    }
];

export default function WhyChooseUs() {
    return (
        <section className={styles.section}>
            <h2 className={styles.title}>Why Choose Appwars Technologies?</h2>
            <div className={styles.grid}>
                {features.map((feature, index) => (
                    <div key={index} className={styles.card}>
                        <div className={styles.iconWrapper}>{feature.icon}</div>
                        <h3 className={styles.cardTitle}>{feature.title}</h3>
                        <p className={styles.description}>{feature.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
