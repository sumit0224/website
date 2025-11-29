
import styles from './page.module.css';
import dbConnect from '@/lib/db';
import Blog from '@/models/Blog';

async function getBlogs() {
    await dbConnect();
    // Fallback if DB connection fails or no URI
    if (!process.env.MONGODB_URI) return [];

    try {
        const blogs = await Blog.find({}).lean();
        return blogs.map(blog => ({
            ...blog,
            _id: blog._id.toString(),
            createdAt: blog.createdAt?.toISOString(),
            updatedAt: blog.updatedAt?.toISOString()
        }));
    } catch (error) {
        console.error("Failed to fetch blogs:", error);
        return [];
    }
}

export default async function Blogs() {
    const blogs = await getBlogs();

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Latest Insights</h1>
            <div className={styles.grid}>
                {blogs.length === 0 ? (
                    <p style={{ textAlign: 'center', gridColumn: '1/-1' }}>No blogs available at the moment.</p>
                ) : (
                    blogs.map((blog) => (
                        <div key={blog._id} className={styles.card}>
                            <img src={blog.image} alt={blog.title} className={styles.image} />
                            <div className={styles.content}>
                                <h2 className={styles.blogTitle}>{blog.title}</h2>
                                <p className={styles.excerpt}>{blog.excerpt}</p>
                                <div className={styles.meta}>
                                    <span>{blog.date}</span>
                                    <span>By {blog.author}</span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
