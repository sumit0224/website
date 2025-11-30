"use client";

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import ConfirmDialog from '@/components/ConfirmDialog';
import styles from './page.module.css';

export default function Admin() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [activeTab, setActiveTab] = useState('courses');

    const [courses, setCourses] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [enrolls, setEnrolls] = useState([]);
    const [alumni, setAlumni] = useState([]);
    const [gallery, setGallery] = useState([]);
    const [counseling, setCounseling] = useState([]);

    // Form states
    const [showCourseForm, setShowCourseForm] = useState(false);
    const [showBlogForm, setShowBlogForm] = useState(false);
    const [showAlumniForm, setShowAlumniForm] = useState(false);
    const [showGalleryForm, setShowGalleryForm] = useState(false);

    // Edit states
    const [editingCourse, setEditingCourse] = useState(null);
    const [editingBlog, setEditingBlog] = useState(null);
    const [editingGallery, setEditingGallery] = useState(null);
    const [editingAlumni, setEditingAlumni] = useState(null);

    // View modal states
    const [viewingEnrollment, setViewingEnrollment] = useState(null);
    const [viewingCounseling, setViewingCounseling] = useState(null);

    // Upload states
    const [uploading, setUploading] = useState(false);

    const [newCourse, setNewCourse] = useState({
        id: '', title: '', description: '', duration: '', level: '', image: '', syllabus: [{ title: '', topics: [''] }], syllabusPdf: '', actualPrice: '', discountedPrice: ''
    });
    const [newBlog, setNewBlog] = useState({
        title: '', excerpt: '', date: '', author: '', image: ''
    });
    const [newAlumni, setNewAlumni] = useState({
        name: '', role: '', company: '', image: ''
    });
    const [newGallery, setNewGallery] = useState({
        title: '', description: '', image: '', category: ''
    });

    // Confirmation dialog state
    const [confirmDialog, setConfirmDialog] = useState({
        isOpen: false,
        title: '',
        message: '',
        onConfirm: () => { }
    });

    useEffect(() => {
        const isAdmin = localStorage.getItem('isAdmin');
        if (isAdmin === 'true') {
            setIsAuthenticated(true);
        }
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            fetchData();
        }
    }, [isAuthenticated, activeTab]);

    const fetchData = async () => {
        if (activeTab === 'courses') {
            const res = await fetch('/api/courses');
            if (res.ok) setCourses(await res.json());
        } else if (activeTab === 'enrolls') {
            const res = await fetch('/api/enrollments');
            if (res.ok) setEnrolls(await res.json());
        } else if (activeTab === 'blogs') {
            const res = await fetch('/api/blogs');
            if (res.ok) setBlogs(await res.json());
        } else if (activeTab === 'alumni') {
            const res = await fetch('/api/alumni');
            if (res.ok) setAlumni(await res.json());
        } else if (activeTab === 'gallery') {
            const res = await fetch('/api/gallery');
            if (res.ok) setGallery(await res.json());
        } else if (activeTab === 'counseling') {
            const res = await fetch('/api/counseling');
            if (res.ok) setCounseling(await res.json());
        }
    };

    const handleLogin = (e) => {
        e.preventDefault();
        if (username === 'admin' && password === 'Sumit@0924') {
            localStorage.setItem('isAdmin', 'true');
            setIsAuthenticated(true);
            toast.success('Logged in successfully');
        } else {
            toast.error('Invalid credentials ');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('isAdmin');
        setIsAuthenticated(false);
        toast.success('Logged out');
    };

    // Image upload handler
    const handleImageUpload = async (file) => {
        if (!file) return null;

        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            });

            if (res.ok) {
                const data = await res.json();
                toast.success('Image uploaded successfully');
                return data.imageUrl;
            } else {
                toast.error('Failed to upload image');
                return null;
            }
        } catch (error) {
            toast.error('Error uploading image');
            return null;
        } finally {
            setUploading(false);
        }
    };

    // Course handlers
    const handleAddCourse = async (e) => {
        e.preventDefault();
        // Syllabus is already structured in state
        const courseData = { ...newCourse };

        const res = await fetch('/api/courses', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(courseData)
        });

        if (res.ok) {
            toast.success('Course added successfully');
            setShowCourseForm(false);
            setNewCourse({ id: '', title: '', description: '', duration: '', level: '', image: '', syllabus: [{ title: '', topics: [''] }], syllabusPdf: '', actualPrice: '', discountedPrice: '' });
            fetchData();
        } else {
            toast.error('Failed to add course');
        }
    };

    const handleUpdateCourse = async (e) => {
        e.preventDefault();
        // Syllabus is already structured in state
        const courseData = { ...editingCourse };

        const res = await fetch(`/api/courses/${editingCourse.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(courseData)
        });

        if (res.ok) {
            toast.success('Course updated successfully');
            setEditingCourse(null);
            fetchData();
        } else {
            toast.error('Failed to update course');
        }
    };

    const handleDeleteCourse = (id) => {
        setConfirmDialog({
            isOpen: true,
            title: 'Delete Course',
            message: 'Are you sure you want to delete this course? This action cannot be undone.',
            onConfirm: async () => {
                setConfirmDialog({ ...confirmDialog, isOpen: false });
                const res = await fetch(`/api/courses/${id}`, { method: 'DELETE' });
                if (res.ok) {
                    toast.success('Course deleted');
                    fetchData();
                } else {
                    toast.error('Failed to delete course');
                }
            }
        });
    };

    // Blog handlers
    const handleAddBlog = async (e) => {
        e.preventDefault();
        const res = await fetch('/api/blogs', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newBlog)
        });

        if (res.ok) {
            toast.success('Blog added successfully');
            setShowBlogForm(false);
            setNewBlog({ title: '', excerpt: '', date: '', author: '', image: '' });
            fetchData();
        } else {
            toast.error('Failed to add blog');
        }
    };

    const handleUpdateBlog = async (e) => {
        e.preventDefault();
        const res = await fetch(`/api/blogs/${editingBlog._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editingBlog)
        });

        if (res.ok) {
            toast.success('Blog updated successfully');
            setEditingBlog(null);
            fetchData();
        } else {
            toast.error('Failed to update blog');
        }
    };

    const handleDeleteBlog = (id) => {
        setConfirmDialog({
            isOpen: true,
            title: 'Delete Blog',
            message: 'Are you sure you want to delete this blog? This action cannot be undone.',
            onConfirm: async () => {
                setConfirmDialog({ ...confirmDialog, isOpen: false });
                const res = await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
                if (res.ok) {
                    toast.success('Blog deleted');
                    fetchData();
                } else {
                    toast.error('Failed to delete blog');
                }
            }
        });
    };

    // Gallery handlers
    const handleAddGallery = async (e) => {
        e.preventDefault();
        const res = await fetch('/api/gallery', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newGallery)
        });

        if (res.ok) {
            toast.success('Gallery item added successfully');
            setShowGalleryForm(false);
            setNewGallery({ title: '', description: '', image: '', category: '' });
            fetchData();
        } else {
            toast.error('Failed to add gallery item');
        }
    };

    const handleUpdateGallery = async (e) => {
        e.preventDefault();
        const res = await fetch(`/api/gallery/${editingGallery._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editingGallery)
        });

        if (res.ok) {
            toast.success('Gallery item updated successfully');
            setEditingGallery(null);
            fetchData();
        } else {
            toast.error('Failed to update gallery item');
        }
    };

    const handleDeleteGallery = (id) => {
        setConfirmDialog({
            isOpen: true,
            title: 'Delete Gallery Item',
            message: 'Are you sure you want to delete this gallery item? This action cannot be undone.',
            onConfirm: async () => {
                setConfirmDialog({ ...confirmDialog, isOpen: false });
                const res = await fetch(`/api/gallery/${id}`, { method: 'DELETE' });
                if (res.ok) {
                    toast.success('Gallery item deleted');
                    fetchData();
                } else {
                    toast.error('Failed to delete gallery item');
                }
            }
        });
    };

    // Alumni handlers
    const handleAddAlumni = async (e) => {
        e.preventDefault();
        const res = await fetch('/api/alumni', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newAlumni)
        });

        if (res.ok) {
            toast.success('Alumni added successfully');
            setShowAlumniForm(false);
            setNewAlumni({ name: '', role: '', company: '', image: '' });
            fetchData();
        } else {
            toast.error('Failed to add alumni');
        }
    };

    const handleUpdateAlumni = async (e) => {
        e.preventDefault();
        const res = await fetch(`/api/alumni/${editingAlumni._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editingAlumni)
        });

        if (res.ok) {
            toast.success('Alumni updated successfully');
            setEditingAlumni(null);
            fetchData();
        } else {
            toast.error('Failed to update alumni');
        }
    };

    const handleDeleteAlumni = (id) => {
        setConfirmDialog({
            isOpen: true,
            title: 'Delete Alumni',
            message: 'Are you sure you want to delete this alumni? This action cannot be undone.',
            onConfirm: async () => {
                setConfirmDialog({ ...confirmDialog, isOpen: false });
                const res = await fetch(`/api/alumni/${id}`, { method: 'DELETE' });
                if (res.ok) {
                    toast.success('Alumni deleted');
                    fetchData();
                } else {
                    toast.error('Failed to delete alumni');
                }
            }
        });
    };

    // Counseling handlers
    const handleDeleteCounseling = (id) => {
        setConfirmDialog({
            isOpen: true,
            title: 'Delete Request',
            message: 'Are you sure you want to delete this counseling request? This action cannot be undone.',
            onConfirm: async () => {
                setConfirmDialog({ ...confirmDialog, isOpen: false });
                const res = await fetch(`/api/counseling/${id}`, { method: 'DELETE' });
                if (res.ok) {
                    toast.success('Request deleted');
                    fetchData();
                } else {
                    toast.error('Failed to delete request');
                }
            }
        });
    };

    const handleUpdateCounselingStatus = async (id, newStatus) => {
        const res = await fetch(`/api/counseling/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: newStatus })
        });

        if (res.ok) {
            toast.success('Status updated');
            fetchData();
        } else {
            toast.error('Failed to update status');
        }
    };

    if (!isAuthenticated) {
        return (
            <div className={styles.loginContainer}>
                <form className={styles.loginForm} onSubmit={handleLogin}>
                    <h2 className={styles.loginTitle}>Admin Login</h2>
                    <input
                        type="text"
                        placeholder="Username"
                        className={styles.input}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className={styles.input}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" className={styles.btn}>Login</button>
                </form>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <aside className={styles.sidebar}>
                <div className={styles.sidebarTitle}>Admin Panel</div>
                <button
                    className={`${styles.navBtn} ${activeTab === 'courses' ? styles.active : ''}`}
                    onClick={() => setActiveTab('courses')}
                >
                    Manage Courses
                </button>
                <button
                    className={`${styles.navBtn} ${activeTab === 'blogs' ? styles.active : ''}`}
                    onClick={() => setActiveTab('blogs')}
                >
                    Manage Blogs
                </button>
                <button
                    className={`${styles.navBtn} ${activeTab === 'gallery' ? styles.active : ''}`}
                    onClick={() => setActiveTab('gallery')}
                >
                    Manage Gallery
                </button>
                <button
                    className={`${styles.navBtn} ${activeTab === 'enrolls' ? styles.active : ''}`}
                    onClick={() => setActiveTab('enrolls')}
                >
                    View Enrollments
                </button>
                <button
                    className={`${styles.navBtn} ${activeTab === 'counseling' ? styles.active : ''}`}
                    onClick={() => setActiveTab('counseling')}
                >
                    Counseling Requests
                </button>
                <button
                    className={`${styles.navBtn} ${activeTab === 'alumni' ? styles.active : ''}`}
                    onClick={() => setActiveTab('alumni')}
                >
                    Manage Alumni
                </button>
                <button
                    className={styles.navBtn}
                    onClick={handleLogout}
                    style={{ marginTop: 'auto', color: '#ef4444' }}
                >
                    Logout
                </button>
            </aside>

            <main className={styles.main}>
                {activeTab === 'courses' && (
                    <div>
                        <div className={styles.header}>
                            <h2 className={styles.title}>Courses</h2>
                            <button className={styles.btn} onClick={() => setShowCourseForm(!showCourseForm)}>
                                {showCourseForm ? 'Cancel' : 'Add New Course'}
                            </button>
                        </div>

                        {showCourseForm && (
                            <form className={styles.form} onSubmit={handleAddCourse}>
                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Course ID</label>
                                    <input className={styles.input} placeholder="e.g., web-dev" value={newCourse.id} onChange={e => setNewCourse({ ...newCourse, id: e.target.value })} required />
                                </div>
                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Title</label>
                                    <input className={styles.input} placeholder="e.g., Full Stack Web Development" value={newCourse.title} onChange={e => setNewCourse({ ...newCourse, title: e.target.value })} required />
                                </div>
                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Description</label>
                                    <textarea className={styles.input} placeholder="Enter course description..." value={newCourse.description} onChange={e => setNewCourse({ ...newCourse, description: e.target.value })} required rows={4} />
                                </div>
                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Duration</label>
                                    <input className={styles.input} placeholder="e.g., 6 Months" value={newCourse.duration} onChange={e => setNewCourse({ ...newCourse, duration: e.target.value })} required />
                                </div>
                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Level</label>
                                    <input className={styles.input} placeholder="e.g., Beginner to Advanced" value={newCourse.level} onChange={e => setNewCourse({ ...newCourse, level: e.target.value })} required />
                                </div>
                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Actual Price (₹)</label>
                                    <input type="number" className={styles.input} placeholder="e.g., 5000" value={newCourse.actualPrice} onChange={e => setNewCourse({ ...newCourse, actualPrice: e.target.value })} />
                                </div>
                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Discounted Price (₹)</label>
                                    <input type="number" className={styles.input} placeholder="e.g., 3000" value={newCourse.discountedPrice} onChange={e => setNewCourse({ ...newCourse, discountedPrice: e.target.value })} />
                                </div>

                                <div className={styles.imageUploadContainer}>
                                    <label className={styles.label}>Course Image</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className={styles.fileInput}
                                        onChange={async (e) => {
                                            const file = e.target.files[0];
                                            if (file) {
                                                const imageUrl = await handleImageUpload(file);
                                                if (imageUrl) setNewCourse({ ...newCourse, image: imageUrl });
                                            }
                                        }}
                                    />
                                    {newCourse.image && (
                                        <div className={styles.imagePreview}>
                                            <img src={newCourse.image} alt="Preview" />
                                        </div>
                                    )}
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Syllabus</label>
                                    {newCourse.syllabus.map((module, mIndex) => (
                                        <div key={mIndex} className={styles.moduleCard} style={{ border: '1px solid #e2e8f0', padding: '1rem', marginBottom: '1rem', borderRadius: '0.5rem' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                                <input
                                                    className={styles.input}
                                                    placeholder={`Module ${mIndex + 1} Title`}
                                                    value={module.title}
                                                    onChange={e => {
                                                        const updatedSyllabus = [...newCourse.syllabus];
                                                        updatedSyllabus[mIndex].title = e.target.value;
                                                        setNewCourse({ ...newCourse, syllabus: updatedSyllabus });
                                                    }}
                                                    required
                                                />
                                                <button type="button" onClick={() => {
                                                    const updatedSyllabus = newCourse.syllabus.filter((_, i) => i !== mIndex);
                                                    setNewCourse({ ...newCourse, syllabus: updatedSyllabus });
                                                }} style={{ color: 'red', marginLeft: '0.5rem' }}>Remove Module</button>
                                            </div>
                                            {module.topics.map((topic, tIndex) => (
                                                <div key={tIndex} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                                    <input
                                                        className={styles.input}
                                                        placeholder="Topic"
                                                        value={topic}
                                                        onChange={e => {
                                                            const updatedSyllabus = [...newCourse.syllabus];
                                                            updatedSyllabus[mIndex].topics[tIndex] = e.target.value;
                                                            setNewCourse({ ...newCourse, syllabus: updatedSyllabus });
                                                        }}
                                                        required
                                                    />
                                                    <button type="button" onClick={() => {
                                                        const updatedSyllabus = [...newCourse.syllabus];
                                                        updatedSyllabus[mIndex].topics = updatedSyllabus[mIndex].topics.filter((_, i) => i !== tIndex);
                                                        setNewCourse({ ...newCourse, syllabus: updatedSyllabus });
                                                    }} style={{ color: 'red' }}>X</button>
                                                </div>
                                            ))}
                                            <button type="button" onClick={() => {
                                                const updatedSyllabus = [...newCourse.syllabus];
                                                updatedSyllabus[mIndex].topics.push('');
                                                setNewCourse({ ...newCourse, syllabus: updatedSyllabus });
                                            }} style={{ fontSize: '0.875rem', color: '#3b82f6' }}>+ Add Topic</button>
                                        </div>
                                    ))}
                                    <button type="button" onClick={() => setNewCourse({ ...newCourse, syllabus: [...newCourse.syllabus, { title: '', topics: [''] }] })} className={styles.btnSecondary} style={{ width: '100%', marginTop: '0.5rem' }}>
                                        + Add Module
                                    </button>
                                </div>

                                <div className={styles.imageUploadContainer}>
                                    <label className={styles.label}>Syllabus PDF (Optional)</label>
                                    <input
                                        type="file"
                                        accept="application/pdf"
                                        className={styles.fileInput}
                                        onChange={async (e) => {
                                            const file = e.target.files[0];
                                            if (file) {
                                                const pdfUrl = await handleImageUpload(file); // Reusing image upload for PDF as it likely just uploads to cloud/server
                                                if (pdfUrl) setNewCourse({ ...newCourse, syllabusPdf: pdfUrl });
                                            }
                                        }}
                                    />
                                    {newCourse.syllabusPdf && (
                                        <div className={styles.imagePreview}>
                                            <a href={newCourse.syllabusPdf} target="_blank" rel="noopener noreferrer" style={{ color: '#3b82f6' }}>View Uploaded PDF</a>
                                        </div>
                                    )}
                                </div>
                                <button type="submit" className={styles.btn} disabled={uploading}>
                                    {uploading ? 'Uploading...' : 'Save Course'}
                                </button>
                            </form>
                        )}

                        <div className={styles.card}>
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th className={styles.th}>Title</th>
                                        <th className={styles.th}>Level</th>
                                        <th className={styles.th}>Duration</th>
                                        <th className={styles.th}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {courses.map(course => (
                                        <tr key={course._id}>
                                            <td className={styles.td}>{course.title}</td>
                                            <td className={styles.td}>{course.level}</td>
                                            <td className={styles.td}>{course.duration}</td>
                                            <td className={styles.td}>
                                                <button className={styles.actionBtn} style={{ color: '#3b82f6' }} onClick={() => setEditingCourse(course)}>Edit</button>
                                                <button className={styles.actionBtn} style={{ color: '#ef4444' }} onClick={() => handleDeleteCourse(course.id)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'blogs' && (
                    <div>
                        <div className={styles.header}>
                            <h2 className={styles.title}>Blogs</h2>
                            <button className={styles.btn} onClick={() => setShowBlogForm(!showBlogForm)}>
                                {showBlogForm ? 'Cancel' : 'Write New Blog'}
                            </button>
                        </div>

                        {showBlogForm && (
                            <form className={styles.form} onSubmit={handleAddBlog}>
                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Blog Title</label>
                                    <input className={styles.input} placeholder="Enter blog title" value={newBlog.title} onChange={e => setNewBlog({ ...newBlog, title: e.target.value })} required />
                                </div>
                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Excerpt</label>
                                    <textarea className={styles.input} placeholder="Short summary of the blog post..." value={newBlog.excerpt} onChange={e => setNewBlog({ ...newBlog, excerpt: e.target.value })} required rows={3} />
                                </div>
                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Date</label>
                                    <input className={styles.input} placeholder="e.g., October 25, 2023" value={newBlog.date} onChange={e => setNewBlog({ ...newBlog, date: e.target.value })} required />
                                </div>
                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Author</label>
                                    <input className={styles.input} placeholder="Author Name" value={newBlog.author} onChange={e => setNewBlog({ ...newBlog, author: e.target.value })} required />
                                </div>

                                <div className={styles.imageUploadContainer}>
                                    <label className={styles.label}>Blog Image</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className={styles.fileInput}
                                        onChange={async (e) => {
                                            const file = e.target.files[0];
                                            if (file) {
                                                const imageUrl = await handleImageUpload(file);
                                                if (imageUrl) setNewBlog({ ...newBlog, image: imageUrl });
                                            }
                                        }}
                                    />
                                    {newBlog.image && (
                                        <div className={styles.imagePreview}>
                                            <img src={newBlog.image} alt="Preview" />
                                        </div>
                                    )}
                                </div>

                                <button type="submit" className={styles.btn} disabled={uploading}>
                                    {uploading ? 'Uploading...' : 'Publish Blog'}
                                </button>
                            </form>
                        )}

                        <div className={styles.card}>
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th className={styles.th}>Title</th>
                                        <th className={styles.th}>Author</th>
                                        <th className={styles.th}>Date</th>
                                        <th className={styles.th}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {blogs.map(blog => (
                                        <tr key={blog._id}>
                                            <td className={styles.td}>{blog.title}</td>
                                            <td className={styles.td}>{blog.author}</td>
                                            <td className={styles.td}>{blog.date}</td>
                                            <td className={styles.td}>
                                                <button className={styles.actionBtn} style={{ color: '#3b82f6' }} onClick={() => setEditingBlog(blog)}>Edit</button>
                                                <button className={styles.actionBtn} style={{ color: '#ef4444' }} onClick={() => handleDeleteBlog(blog._id)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'gallery' && (
                    <div>
                        <div className={styles.header}>
                            <h2 className={styles.title}>Gallery</h2>
                            <button className={styles.btn} onClick={() => setShowGalleryForm(!showGalleryForm)}>
                                {showGalleryForm ? 'Cancel' : 'Add New Item'}
                            </button>
                        </div>

                        {showGalleryForm && (
                            <form className={styles.form} onSubmit={handleAddGallery}>
                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Title</label>
                                    <input className={styles.input} placeholder="Enter gallery item title" value={newGallery.title} onChange={e => setNewGallery({ ...newGallery, title: e.target.value })} required />
                                </div>
                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Description</label>
                                    <textarea className={styles.input} placeholder="Describe this gallery item..." value={newGallery.description} onChange={e => setNewGallery({ ...newGallery, description: e.target.value })} required rows={3} />
                                </div>

                                <div className={styles.imageUploadContainer}>
                                    <label className={styles.label}>Gallery Image</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className={styles.fileInput}
                                        onChange={async (e) => {
                                            const file = e.target.files[0];
                                            if (file) {
                                                const imageUrl = await handleImageUpload(file);
                                                if (imageUrl) setNewGallery({ ...newGallery, image: imageUrl });
                                            }
                                        }}
                                    />
                                    {newGallery.image && (
                                        <div className={styles.imagePreview}>
                                            <img src={newGallery.image} alt="Preview" />
                                        </div>
                                    )}
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Category</label>
                                    <select className={styles.input} value={newGallery.category} onChange={e => setNewGallery({ ...newGallery, category: e.target.value })} required>
                                        <option value="">Select Category</option>
                                        <option value="events">Events</option>
                                        <option value="campus">Campus</option>
                                        <option value="students">Students</option>
                                        <option value="achievements">Achievements</option>
                                    </select>
                                </div>
                                <button type="submit" className={styles.btn} disabled={uploading}>
                                    {uploading ? 'Uploading...' : 'Save Gallery Item'}
                                </button>
                            </form>
                        )}

                        <div className={styles.card}>
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th className={styles.th}>Title</th>
                                        <th className={styles.th}>Category</th>
                                        <th className={styles.th}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {gallery.map(item => (
                                        <tr key={item._id}>
                                            <td className={styles.td}>{item.title}</td>
                                            <td className={styles.td}>{item.category}</td>
                                            <td className={styles.td}>
                                                <button className={styles.actionBtn} style={{ color: '#3b82f6' }} onClick={() => setEditingGallery(item)}>Edit</button>
                                                <button className={styles.actionBtn} style={{ color: '#ef4444' }} onClick={() => handleDeleteGallery(item._id)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'enrolls' && (
                    <div>
                        <div className={styles.header}>
                            <h2 className={styles.title}>Enrollment Inquiries</h2>
                        </div>
                        <div className={styles.card}>
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th className={styles.th}>Name</th>
                                        <th className={styles.th}>Email</th>
                                        <th className={styles.th}>Course</th>
                                        <th className={styles.th}>Date</th>
                                        <th className={styles.th}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {enrolls.map(enroll => (
                                        <tr key={enroll._id}>
                                            <td className={styles.td}>{enroll.name}</td>
                                            <td className={styles.td}>{enroll.email}</td>
                                            <td className={styles.td}>{enroll.course}</td>
                                            <td className={styles.td}>{new Date(enroll.createdAt).toLocaleDateString()}</td>
                                            <td className={styles.td}>
                                                <button className={styles.actionBtn} style={{ color: '#10b981' }} onClick={() => setViewingEnrollment(enroll)}>View Details</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'counseling' && (
                    <div>
                        <div className={styles.header}>
                            <h2 className={styles.title}>Counseling Requests</h2>
                        </div>

                        <div className={styles.card}>
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th className={styles.th}>Name</th>
                                        <th className={styles.th}>Email</th>
                                        <th className={styles.th}>Phone</th>
                                        <th className={styles.th}>Status</th>
                                        <th className={styles.th}>Date</th>
                                        <th className={styles.th}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {counseling.map(req => (
                                        <tr key={req._id}>
                                            <td className={styles.td}>{req.name}</td>
                                            <td className={styles.td}>{req.email}</td>
                                            <td className={styles.td}>{req.phone}</td>
                                            <td className={styles.td}>
                                                <select
                                                    value={req.status}
                                                    onChange={(e) => handleUpdateCounselingStatus(req._id, e.target.value)}
                                                    className={styles.statusSelect}
                                                    style={{
                                                        padding: '0.25rem',
                                                        borderRadius: '0.25rem',
                                                        border: '1px solid #e5e7eb',
                                                        background: req.status === 'New' ? '#dbeafe' : req.status === 'Contacted' ? '#fef3c7' : '#dcfce7',
                                                        color: req.status === 'New' ? '#1e40af' : req.status === 'Contacted' ? '#92400e' : '#166534'
                                                    }}
                                                >
                                                    <option value="New">New</option>
                                                    <option value="Contacted">Contacted</option>
                                                    <option value="Resolved">Resolved</option>
                                                </select>
                                            </td>
                                            <td className={styles.td}>{new Date(req.createdAt).toLocaleDateString()}</td>
                                            <td className={styles.td}>
                                                <button className={styles.actionBtn} style={{ color: '#10b981', marginRight: '0.5rem' }} onClick={() => setViewingCounseling(req)}>View</button>
                                                <button className={styles.actionBtn} style={{ color: '#ef4444' }} onClick={() => handleDeleteCounseling(req._id)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'alumni' && (
                    <div>
                        <div className={styles.header}>
                            <h2 className={styles.title}>Success Alumni</h2>
                            <button className={styles.btn} onClick={() => setShowAlumniForm(!showAlumniForm)}>
                                {showAlumniForm ? 'Cancel' : 'Add New Alumni'}
                            </button>
                        </div>

                        {showAlumniForm && (
                            <form className={styles.form} onSubmit={handleAddAlumni}>
                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Name</label>
                                    <input className={styles.input} placeholder="Alumni Name" value={newAlumni.name} onChange={e => setNewAlumni({ ...newAlumni, name: e.target.value })} required />
                                </div>
                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Role</label>
                                    <input className={styles.input} placeholder="e.g., Software Engineer" value={newAlumni.role} onChange={e => setNewAlumni({ ...newAlumni, role: e.target.value })} required />
                                </div>
                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Company</label>
                                    <input className={styles.input} placeholder="e.g., Google" value={newAlumni.company} onChange={e => setNewAlumni({ ...newAlumni, company: e.target.value })} required />

                                </div>
                                <div className={styles.imageUploadContainer}>
                                    <label className={styles.label}>Alumni Image (Optional)</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className={styles.fileInput}
                                        onChange={async (e) => {
                                            const file = e.target.files[0];
                                            if (file) {
                                                const imageUrl = await handleImageUpload(file);
                                                if (imageUrl) setNewAlumni({ ...newAlumni, image: imageUrl });
                                            }
                                        }}
                                    />
                                    {newAlumni.image && (
                                        <div className={styles.imagePreview}>
                                            <img src={newAlumni.image} alt="Preview" />
                                        </div>
                                    )}
                                </div>

                                <button type="submit" className={styles.btn} disabled={uploading}>
                                    {uploading ? 'Uploading...' : 'Save Alumni'}
                                </button>
                            </form>
                        )}

                        <div className={styles.card}>
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th className={styles.th}>Name</th>
                                        <th className={styles.th}>Role</th>
                                        <th className={styles.th}>Company</th>
                                        <th className={styles.th}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {alumni.map(alum => (
                                        <tr key={alum._id}>
                                            <td className={styles.td}>{alum.name}</td>
                                            <td className={styles.td}>{alum.role}</td>
                                            <td className={styles.td}>{alum.company}</td>
                                            <td className={styles.td}>
                                                <button className={styles.actionBtn} style={{ color: '#3b82f6', marginRight: '0.5rem' }} onClick={() => setEditingAlumni(alum)}>Edit</button>
                                                <button className={styles.actionBtn} style={{ color: '#ef4444' }} onClick={() => handleDeleteAlumni(alum._id)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </main>

            {/* View Counseling Modal */}
            {viewingCounseling && (
                <div className={styles.modal} onClick={() => setViewingCounseling(null)}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <h2>Counseling Request Details</h2>
                        <div className={styles.detailsGrid}>
                            <div className={styles.detailItem}>
                                <strong>Name:</strong> {viewingCounseling.name}
                            </div>
                            <div className={styles.detailItem}>
                                <strong>Email:</strong> {viewingCounseling.email}
                            </div>
                            <div className={styles.detailItem}>
                                <strong>Phone:</strong> {viewingCounseling.phone}
                            </div>
                            <div className={styles.detailItem}>
                                <strong>Status:</strong> {viewingCounseling.status}
                            </div>
                            <div className={styles.detailItem}>
                                <strong>Date:</strong> {new Date(viewingCounseling.createdAt).toLocaleString()}
                            </div>
                            {viewingCounseling.message && (
                                <div className={styles.detailItem} style={{ gridColumn: '1 / -1' }}>
                                    <strong>Message:</strong>
                                    <p style={{ marginTop: '0.5rem', padding: '0.75rem', background: '#f3f4f6', borderRadius: '0.5rem' }}>
                                        {viewingCounseling.message}
                                    </p>
                                </div>
                            )}
                        </div>
                        <div className={styles.modalActions}>
                            <button type="button" className={styles.btn} onClick={() => setViewingCounseling(null)}>Close</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Course Modal */}
            {editingCourse && (
                <div className={styles.modal} onClick={() => setEditingCourse(null)}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <h2>Edit Course</h2>
                        <form onSubmit={handleUpdateCourse}>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Course ID</label>
                                <input className={styles.input} placeholder="ID" value={editingCourse.id} onChange={e => setEditingCourse({ ...editingCourse, id: e.target.value })} required disabled />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Title</label>
                                <input className={styles.input} placeholder="Title" value={editingCourse.title} onChange={e => setEditingCourse({ ...editingCourse, title: e.target.value })} required />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Description</label>
                                <textarea className={styles.input} placeholder="Description" value={editingCourse.description} onChange={e => setEditingCourse({ ...editingCourse, description: e.target.value })} required rows={4} />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Duration</label>
                                <input className={styles.input} placeholder="Duration" value={editingCourse.duration} onChange={e => setEditingCourse({ ...editingCourse, duration: e.target.value })} required />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Level</label>
                                <input className={styles.input} placeholder="Level" value={editingCourse.level} onChange={e => setEditingCourse({ ...editingCourse, level: e.target.value })} required />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Actual Price (₹)</label>
                                <input type="number" className={styles.input} placeholder="e.g., 5000" value={editingCourse.actualPrice || ''} onChange={e => setEditingCourse({ ...editingCourse, actualPrice: e.target.value })} />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Discounted Price (₹)</label>
                                <input type="number" className={styles.input} placeholder="e.g., 3000" value={editingCourse.discountedPrice || ''} onChange={e => setEditingCourse({ ...editingCourse, discountedPrice: e.target.value })} />
                            </div>

                            <div className={styles.imageUploadContainer}>
                                <label className={styles.label}>Course Image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className={styles.fileInput}
                                    onChange={async (e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            const imageUrl = await handleImageUpload(file);
                                            if (imageUrl) setEditingCourse({ ...editingCourse, image: imageUrl });
                                        }
                                    }}
                                />
                                {editingCourse.image && (
                                    <div className={styles.imagePreview}>
                                        <img src={editingCourse.image} alt="Preview" />
                                    </div>
                                )}
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>Syllabus</label>
                                {(Array.isArray(editingCourse.syllabus) ? editingCourse.syllabus : []).map((module, mIndex) => (
                                    <div key={mIndex} className={styles.moduleCard} style={{ border: '1px solid #e2e8f0', padding: '1rem', marginBottom: '1rem', borderRadius: '0.5rem' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                            <input
                                                className={styles.input}
                                                placeholder={`Module ${mIndex + 1} Title`}
                                                value={module.title}
                                                onChange={e => {
                                                    const updatedSyllabus = [...editingCourse.syllabus];
                                                    updatedSyllabus[mIndex].title = e.target.value;
                                                    setEditingCourse({ ...editingCourse, syllabus: updatedSyllabus });
                                                }}
                                                required
                                            />
                                            <button type="button" onClick={() => {
                                                const updatedSyllabus = editingCourse.syllabus.filter((_, i) => i !== mIndex);
                                                setEditingCourse({ ...editingCourse, syllabus: updatedSyllabus });
                                            }} style={{ color: 'red', marginLeft: '0.5rem' }}>Remove Module</button>
                                        </div>
                                        {module.topics.map((topic, tIndex) => (
                                            <div key={tIndex} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                                <input
                                                    className={styles.input}
                                                    placeholder="Topic"
                                                    value={topic}
                                                    onChange={e => {
                                                        const updatedSyllabus = [...editingCourse.syllabus];
                                                        updatedSyllabus[mIndex].topics[tIndex] = e.target.value;
                                                        setEditingCourse({ ...editingCourse, syllabus: updatedSyllabus });
                                                    }}
                                                    required
                                                />
                                                <button type="button" onClick={() => {
                                                    const updatedSyllabus = [...editingCourse.syllabus];
                                                    updatedSyllabus[mIndex].topics = updatedSyllabus[mIndex].topics.filter((_, i) => i !== tIndex);
                                                    setEditingCourse({ ...editingCourse, syllabus: updatedSyllabus });
                                                }} style={{ color: 'red' }}>X</button>
                                            </div>
                                        ))}
                                        <button type="button" onClick={() => {
                                            const updatedSyllabus = [...editingCourse.syllabus];
                                            updatedSyllabus[mIndex].topics.push('');
                                            setEditingCourse({ ...editingCourse, syllabus: updatedSyllabus });
                                        }} style={{ fontSize: '0.875rem', color: '#3b82f6' }}>+ Add Topic</button>
                                    </div>
                                ))}
                                <button type="button" onClick={() => {
                                    const currentSyllabus = Array.isArray(editingCourse.syllabus) ? editingCourse.syllabus : [];
                                    setEditingCourse({ ...editingCourse, syllabus: [...currentSyllabus, { title: '', topics: [''] }] });
                                }} className={styles.btnSecondary} style={{ width: '100%', marginTop: '0.5rem' }}>
                                    + Add Module
                                </button>
                            </div>

                            <div className={styles.imageUploadContainer}>
                                <label className={styles.label}>Syllabus PDF (Optional)</label>
                                <input
                                    type="file"
                                    accept="application/pdf"
                                    className={styles.fileInput}
                                    onChange={async (e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            const pdfUrl = await handleImageUpload(file);
                                            if (pdfUrl) setEditingCourse({ ...editingCourse, syllabusPdf: pdfUrl });
                                        }
                                    }}
                                />
                                {editingCourse.syllabusPdf && (
                                    <div className={styles.imagePreview}>
                                        <a href={editingCourse.syllabusPdf} target="_blank" rel="noopener noreferrer" style={{ color: '#3b82f6' }}>View Uploaded PDF</a>
                                    </div>
                                )}
                            </div>
                            <div className={styles.modalActions}>
                                <button type="submit" className={styles.btn} disabled={uploading}>
                                    {uploading ? 'Uploading...' : 'Update Course'}
                                </button>
                                <button type="button" className={styles.btnSecondary} onClick={() => setEditingCourse(null)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Blog Modal */}
            {editingBlog && (
                <div className={styles.modal} onClick={() => setEditingBlog(null)}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <h2>Edit Blog</h2>
                        <form onSubmit={handleUpdateBlog}>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Blog Title</label>
                                <input className={styles.input} placeholder="Title" value={editingBlog.title} onChange={e => setEditingBlog({ ...editingBlog, title: e.target.value })} required />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Excerpt</label>
                                <textarea className={styles.input} placeholder="Excerpt" value={editingBlog.excerpt} onChange={e => setEditingBlog({ ...editingBlog, excerpt: e.target.value })} required rows={3} />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Date</label>
                                <input className={styles.input} placeholder="Date" value={editingBlog.date} onChange={e => setEditingBlog({ ...editingBlog, date: e.target.value })} required />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Author</label>
                                <input className={styles.input} placeholder="Author" value={editingBlog.author} onChange={e => setEditingBlog({ ...editingBlog, author: e.target.value })} required />
                            </div>

                            <div className={styles.imageUploadContainer}>
                                <label className={styles.label}>Blog Image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className={styles.fileInput}
                                    onChange={async (e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            const imageUrl = await handleImageUpload(file);
                                            if (imageUrl) setEditingBlog({ ...editingBlog, image: imageUrl });
                                        }
                                    }}
                                />
                                {editingBlog.image && (
                                    <div className={styles.imagePreview}>
                                        <img src={editingBlog.image} alt="Preview" />
                                    </div>
                                )}
                            </div>

                            <div className={styles.modalActions}>
                                <button type="submit" className={styles.btn} disabled={uploading}>
                                    {uploading ? 'Uploading...' : 'Update Blog'}
                                </button>
                                <button type="button" className={styles.btnSecondary} onClick={() => setEditingBlog(null)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Gallery Modal */}
            {editingGallery && (
                <div className={styles.modal} onClick={() => setEditingGallery(null)}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <h2>Edit Gallery Item</h2>
                        <form onSubmit={handleUpdateGallery}>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Title</label>
                                <input className={styles.input} placeholder="Title" value={editingGallery.title} onChange={e => setEditingGallery({ ...editingGallery, title: e.target.value })} required />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Description</label>
                                <textarea className={styles.input} placeholder="Description" value={editingGallery.description} onChange={e => setEditingGallery({ ...editingGallery, description: e.target.value })} required rows={3} />
                            </div>

                            <div className={styles.imageUploadContainer}>
                                <label className={styles.label}>Gallery Image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className={styles.fileInput}
                                    onChange={async (e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            const imageUrl = await handleImageUpload(file);
                                            if (imageUrl) setEditingGallery({ ...editingGallery, image: imageUrl });
                                        }
                                    }}
                                />
                                {editingGallery.image && (
                                    <div className={styles.imagePreview}>
                                        <img src={editingGallery.image} alt="Preview" />
                                    </div>
                                )}
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>Category</label>
                                <select className={styles.input} value={editingGallery.category} onChange={e => setEditingGallery({ ...editingGallery, category: e.target.value })} required>
                                    <option value="">Select Category</option>
                                    <option value="events">Events</option>
                                    <option value="campus">Campus</option>
                                    <option value="students">Students</option>
                                    <option value="achievements">Achievements</option>
                                </select>
                            </div>
                            <div className={styles.modalActions}>
                                <button type="submit" className={styles.btn} disabled={uploading}>
                                    {uploading ? 'Uploading...' : 'Update Gallery Item'}
                                </button>
                                <button type="button" className={styles.btnSecondary} onClick={() => setEditingGallery(null)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* View Enrollment Modal */}
            {viewingEnrollment && (
                <div className={styles.modal} onClick={() => setViewingEnrollment(null)}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <h2>Enrollment Details</h2>
                        <div className={styles.detailsGrid}>
                            <div className={styles.detailItem}>
                                <strong>Name:</strong> {viewingEnrollment.name}
                            </div>
                            <div className={styles.detailItem}>
                                <strong>Email:</strong> {viewingEnrollment.email}
                            </div>
                            <div className={styles.detailItem}>
                                <strong>Phone:</strong> {viewingEnrollment.phone}
                            </div>
                            <div className={styles.detailItem}>
                                <strong>Course:</strong> {viewingEnrollment.course}
                            </div>
                            <div className={styles.detailItem}>
                                <strong>Date:</strong> {new Date(viewingEnrollment.createdAt).toLocaleString()}
                            </div>
                            {viewingEnrollment.message && (
                                <div className={styles.detailItem} style={{ gridColumn: '1 / -1' }}>
                                    <strong>Message:</strong>
                                    <p style={{ marginTop: '0.5rem', padding: '0.75rem', background: '#f3f4f6', borderRadius: '0.5rem' }}>
                                        {viewingEnrollment.message}
                                    </p>
                                </div>
                            )}
                        </div>
                        <div className={styles.modalActions}>
                            <button type="button" className={styles.btn} onClick={() => setViewingEnrollment(null)}>Close</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Alumni Modal */}
            {editingAlumni && (
                <div className={styles.modal} onClick={() => setEditingAlumni(null)}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <h2>Edit Alumni</h2>
                        <form onSubmit={handleUpdateAlumni}>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Name</label>
                                <input className={styles.input} placeholder="Alumni Name" value={editingAlumni.name} onChange={e => setEditingAlumni({ ...editingAlumni, name: e.target.value })} required />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Role</label>
                                <input className={styles.input} placeholder="e.g., Software Engineer" value={editingAlumni.role} onChange={e => setEditingAlumni({ ...editingAlumni, role: e.target.value })} required />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Company</label>
                                <input className={styles.input} placeholder="e.g., Google" value={editingAlumni.company} onChange={e => setEditingAlumni({ ...editingAlumni, company: e.target.value })} required />
                            </div>

                            <div className={styles.imageUploadContainer}>
                                <label className={styles.label}>Alumni Image (Optional)</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className={styles.fileInput}
                                    onChange={async (e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            const imageUrl = await handleImageUpload(file);
                                            if (imageUrl) setEditingAlumni({ ...editingAlumni, image: imageUrl });
                                        }
                                    }}
                                />
                                {editingAlumni.image && (
                                    <div className={styles.imagePreview}>
                                        <img src={editingAlumni.image} alt="Preview" />
                                    </div>
                                )}
                            </div>

                            <div className={styles.modalActions}>
                                <button type="submit" className={styles.btn} disabled={uploading}>
                                    {uploading ? 'Uploading...' : 'Update Alumni'}
                                </button>
                                <button type="button" className={styles.btnSecondary} onClick={() => setEditingAlumni(null)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <ConfirmDialog
                isOpen={confirmDialog.isOpen}
                title={confirmDialog.title}
                message={confirmDialog.message}
                onConfirm={confirmDialog.onConfirm}
                onCancel={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
            />
        </div>
    );
}
