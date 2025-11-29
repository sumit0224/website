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
    syllabus: { type: [String], required: true },
}, { timestamps: true });

const Blog = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
const Course = mongoose.models.Course || mongoose.model('Course', CourseSchema);

const courses = [
    {
        id: 'web-dev-fullstack',
        title: 'Full Stack Web Development',
        description: 'Master the MERN stack (MongoDB, Express, React, Node.js) and build modern web applications.',
        duration: '6 Months',
        level: 'Beginner to Advanced',
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
        syllabus: ['HTML/CSS/JS', 'React.js', 'Node.js & Express', 'MongoDB', 'Deployment'],
    },
    {
        id: 'data-science-python',
        title: 'Data Science with Python',
        description: 'Learn data analysis, visualization, and machine learning using Python libraries like Pandas and Scikit-learn.',
        duration: '5 Months',
        level: 'Intermediate',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
        syllabus: ['Python Basics', 'Pandas & NumPy', 'Data Visualization', 'Machine Learning', 'Deep Learning'],
    },
    {
        id: 'ai-ml-mastery',
        title: 'AI & Machine Learning Mastery',
        description: 'Deep dive into Artificial Intelligence and Neural Networks. Build your own AI models.',
        duration: '8 Months',
        level: 'Advanced',
        image: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?auto=format&fit=crop&w=800&q=80',
        syllabus: ['Neural Networks', 'TensorFlow', 'Computer Vision', 'NLP', 'Generative AI'],
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
