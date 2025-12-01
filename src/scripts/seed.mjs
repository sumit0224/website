import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Manually load .env.local
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, '../../.env.local');

if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, 'utf8');
    envConfig.split('\n').forEach(line => {
        const [key, value] = line.split('=');
        if (key && value) {
            process.env[key.trim()] = value.trim();
        }
    });
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('MONGODB_URI is not defined in .env.local');
    process.exit(1);
}

// Define Schemas directly to avoid import issues with Next.js aliases if any
const BlogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    excerpt: { type: String, required: true },
    date: { type: String, required: true },
    author: { type: String, required: true },
    image: { type: String, required: true },
}, { timestamps: true });

const CourseSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: String, required: true },
    level: { type: String, required: true },
    image: { type: String, required: true },
    syllabus: [{
        title: { type: String, required: true },
        topics: [String]
    }],
}, { timestamps: true });

const Blog = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
const Course = mongoose.models.Course || mongoose.model('Course', CourseSchema);

const courses = [
    {
        id: 'data-science-ai',
        title: 'Data Science and AI',
        description: 'Master Data Science and Artificial Intelligence with Python, Machine Learning, and Deep Learning.',
        duration: '8 Months',
        level: 'Advanced',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
        syllabus: [
            { title: 'Introduction to Data Science', topics: ['Python Basics', 'Data Structures', 'NumPy & Pandas'] },
            { title: 'Data Analysis & Visualization', topics: ['Matplotlib', 'Seaborn', 'Exploratory Data Analysis'] },
            { title: 'Machine Learning', topics: ['Regression', 'Classification', 'Clustering', 'Scikit-learn'] },
            { title: 'Deep Learning', topics: ['Neural Networks', 'TensorFlow', 'Keras', 'CNN & RNN'] },
            { title: 'AI Capstone Project', topics: ['Real-world problem solving', 'Model Deployment'] }
        ],
    },
    {
        id: 'data-analytics',
        title: 'Data Analytics',
        description: 'Learn to analyze data, create visualizations, and make data-driven decisions using tools like Excel, SQL, and Power BI.',
        duration: '5 Months',
        level: 'Beginner to Intermediate',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
        syllabus: [
            { title: 'Excel for Data Analysis', topics: ['Advanced Formulas', 'Pivot Tables', 'Data Cleaning'] },
            { title: 'SQL Fundamentals', topics: ['Queries', 'Joins', 'Aggregations', 'Database Design'] },
            { title: 'Data Visualization', topics: ['Power BI Basics', 'DAX', 'Dashboard Creation'] },
            { title: 'Statistical Analysis', topics: ['Descriptive Statistics', 'Hypothesis Testing'] },
            { title: 'Business Intelligence', topics: ['Reporting', 'Data Storytelling'] }
        ],
    },
    {
        id: 'java-full-stack',
        title: 'Java Full Stack',
        description: 'Become a Full Stack Developer with Java. Learn Core Java, Spring Boot, Hibernate, and React/Angular for the frontend.',
        duration: '6 Months',
        level: 'Intermediate',
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
        syllabus: [
            { title: 'Core Java', topics: ['OOP Concepts', 'Collections Framework', 'Multithreading'] },
            { title: 'Backend Development', topics: ['Spring Boot', 'REST APIs', 'Microservices'] },
            { title: 'Database', topics: ['Hibernate', 'JPA', 'SQL', 'Database Design'] },
            { title: 'Frontend Development', topics: ['HTML/CSS/JS', 'React or Angular', 'State Management'] },
            { title: 'Deployment', topics: ['Docker', 'CI/CD', 'Cloud Deployment'] }
        ],
    },
    {
        id: 'mern-full-stack',
        title: 'MERN Full Stack',
        description: 'Master the MERN stack (MongoDB, Express, React, Node.js) and build modern, scalable web applications.',
        duration: '6 Months',
        level: 'Intermediate to Advanced',
        image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80',
        syllabus: [
            { title: 'Frontend Fundamentals', topics: ['HTML5', 'CSS3', 'JavaScript ES6+'] },
            { title: 'React.js', topics: ['Components', 'Hooks', 'Redux', 'React Router'] },
            { title: 'Node.js & Express', topics: ['Server Setup', 'API Development', 'Middleware'] },
            { title: 'Database', topics: ['MongoDB', 'Mongoose', 'Aggregation'] },
            { title: 'Full Stack Deployment', topics: ['Authentication', 'Hosting', 'Performance Optimization'] }
        ],
    },
    {
        id: 'python-full-stack',
        title: 'Python Full Stack',
        description: 'Learn Full Stack Development with Python. Master Django/Flask for backend and React for frontend.',
        duration: '6 Months',
        level: 'Intermediate',
        image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
        syllabus: [
            { title: 'Python Programming', topics: ['Syntax', 'Data Structures', 'OOP', 'Modules'] },
            { title: 'Backend Frameworks', topics: ['Django', 'Flask', 'ORM', 'REST APIs'] },
            { title: 'Frontend Integration', topics: ['React.js', 'Axios', 'State Management'] },
            { title: 'Database', topics: ['PostgreSQL', 'SQLite', 'Database Modeling'] },
            { title: 'Deployment', topics: ['Gunicorn', 'Nginx', 'Docker'] }
        ],
    },
    {
        id: 'digital-marketing',
        title: 'Digital Marketing',
        description: 'Become a Digital Marketing Expert. Learn SEO, SEM, Social Media Marketing, and Content Strategy.',
        duration: '3 Months',
        level: 'Beginner',
        image: 'https://images.unsplash.com/photo-1533750516457-a7f992034fec?auto=format&fit=crop&w=800&q=80',
        syllabus: [
            { title: 'SEO', topics: ['On-page SEO', 'Off-page SEO', 'Keyword Research'] },
            { title: 'SEM & PPC', topics: ['Google Ads', 'Campaign Management', 'Bidding Strategies'] },
            { title: 'Social Media Marketing', topics: ['Facebook/Instagram Ads', 'LinkedIn Marketing', 'Content Calendar'] },
            { title: 'Content Marketing', topics: ['Blogging', 'Copywriting', 'Video Marketing'] },
            { title: 'Analytics', topics: ['Google Analytics', 'Reporting', 'Conversion Tracking'] }
        ],
    },
    {
        id: 'graphic-designing',
        title: 'Graphic Designing',
        description: 'Unleash your creativity. Learn Photoshop, Illustrator, InDesign, and design principles.',
        duration: '4 Months',
        level: 'Beginner',
        image: 'https://images.unsplash.com/photo-1626785774573-4b799314346d?auto=format&fit=crop&w=800&q=80',
        syllabus: [
            { title: 'Design Principles', topics: ['Color Theory', 'Typography', 'Layout', 'Composition'] },
            { title: 'Adobe Photoshop', topics: ['Photo Editing', 'Retouching', 'Digital Art'] },
            { title: 'Adobe Illustrator', topics: ['Vector Graphics', 'Logo Design', 'Illustration'] },
            { title: 'Adobe InDesign', topics: ['Print Design', 'Brochures', 'Magazines'] },
            { title: 'Portfolio', topics: ['Project Presentation', 'Branding', 'Freelancing Basics'] }
        ],
    },
];

const blogs = [
    {
        title: 'The Future of Web Development in 2025',
        excerpt: 'Explore the latest trends in web development, from AI-driven coding to WebAssembly.',
        date: 'October 15, 2025',
        author: 'John Doe',
        image: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=800&q=80',
    },
    {
        title: 'Why Data Science is the Sexiest Job',
        excerpt: 'Data is the new oil. Learn why data scientists are in high demand across industries.',
        date: 'November 1, 2025',
        author: 'Jane Smith',
        image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=800&q=80',
    },
    {
        title: 'Getting Started with Machine Learning',
        excerpt: 'A beginner-friendly guide to understanding the basics of Machine Learning and AI.',
        date: 'November 10, 2025',
        author: 'Alice Johnson',
        image: 'https://images.unsplash.com/photo-1527474305487-b87b222841cc?auto=format&fit=crop&w=800&q=80',
    },
];

async function seed() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        // Clear existing data
        await Course.deleteMany({});
        await Blog.deleteMany({});
        console.log('Cleared existing data');

        // Insert new data
        await Course.insertMany(courses);
        await Blog.insertMany(blogs);
        console.log('Seeded courses and blogs successfully');

        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}

seed();
