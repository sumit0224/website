"use client";

import { useState } from 'react';
import { toast } from 'sonner';
import styles from './page.module.css';

export default function Enroll() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        course: '',
        message: ''
    });


    const [otp, setOtp] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [sendingOtp, setSendingOtp] = useState(false);
    const [verifyingOtp, setVerifyingOtp] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });

        if (e.target.name === 'email') {
            setIsVerified(false);
            setIsOtpSent(false);
            setOtp('');
        }
    };

    const handleSendOtp = async () => {
        if (!formData.email) {
            toast.error('Please enter an email address first.');
            return;
        }
        setSendingOtp(true);
        try {
            const res = await fetch('/api/otp/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: formData.email })
            });
            if (res.ok) {
                toast.success('OTP sent to your email.');
                setIsOtpSent(true);
            } else {
                toast.error('Failed to send OTP.');
            }
        } catch (error) {
            toast.error('Error sending OTP.');
        } finally {
            setSendingOtp(false);
        }
    };

    const handleVerifyOtp = async () => {
        if (!otp) {
            toast.error('Please enter the OTP.');
            return;
        }
        setVerifyingOtp(true);
        try {
            const res = await fetch('/api/otp/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: formData.email, otp })
            });
            if (res.ok) {
                toast.success('Email verified successfully!');
                setIsVerified(true);
                setIsOtpSent(false);
            } else {
                toast.error('Invalid OTP. Please try again.');
            }
        } catch (error) {
            toast.error('Error verifying OTP.');
        } finally {
            setVerifyingOtp(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isVerified) {
            toast.error('Please verify your email before submitting.');
            return;
        }

        try {
            const res = await fetch('/api/enroll', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                toast.success('Enrollment successful! Please check your email.');
                setFormData({ name: '', email: '', phone: '', course: '', message: '' });
                setIsVerified(false);
                setOtp('');
            } else {
                toast.error('Something went wrong. Please try again.');
            }
        } catch (error) {
            console.error('Enrollment error:', error);
            toast.error('Error submitting form.');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.imageSection}>
                    <img
                        src="/enroll-hero.png"
                        alt="Students learning online"
                        className={styles.image}
                    />
                </div>

                <div className={styles.formSection}>
                    <h1 className={styles.title}>Start Your Journey</h1>
                    <p className={styles.subtitle}>Join thousands of students mastering new skills today.</p>

                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div className={styles.group}>
                            <label className={styles.label} htmlFor="name">Full Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className={styles.input}
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="John Doe"
                            />
                        </div>

                        <div className={styles.group}>
                            <label className={styles.label} htmlFor="email">Email Address</label>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className={styles.input}
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    disabled={isVerified}
                                    placeholder="john@example.com"
                                    style={{ flex: 1 }}
                                />
                                {!isVerified && (
                                    <button
                                        type="button"
                                        onClick={handleSendOtp}
                                        disabled={sendingOtp || !formData.email}
                                        className={styles.verifyBtn}
                                    >
                                        {sendingOtp ? 'Sending...' : 'Verify Email'}
                                    </button>
                                )}
                                {isVerified && (
                                    <span style={{ color: '#10b981', alignSelf: 'center', fontWeight: 'bold', whiteSpace: 'nowrap' }}>✓ Verified</span>
                                )}
                            </div>
                        </div>

                        {isOtpSent && !isVerified && (
                            <div className={styles.group}>
                                <label className={styles.label}>Enter OTP</label>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <input
                                        type="text"
                                        className={styles.input}
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        placeholder="Enter 6-digit OTP"
                                        style={{ flex: 1 }}
                                    />
                                    <button
                                        type="button"
                                        onClick={handleVerifyOtp}
                                        disabled={verifyingOtp}
                                        className={styles.verifyBtn}
                                        style={{ backgroundColor: '#10b981' }}
                                    >
                                        {verifyingOtp ? 'Checking...' : 'Confirm OTP'}
                                    </button>
                                </div>
                            </div>
                        )}

                        <div className={styles.group}>
                            <label className={styles.label} htmlFor="phone">Phone Number</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                className={styles.input}
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                placeholder="+1 (555) 000-0000"
                            />
                        </div>

                        <div className={styles.group}>
                            <label className={styles.label} htmlFor="course">Select Course</label>
                            <select
                                id="course"
                                name="course"
                                className={styles.select}
                                value={formData.course}
                                onChange={handleChange}
                                required
                            >
                                <option value="">-- Select a Course --</option>
                                <option value="web-development">Full Stack Web Development</option>
                                <option value="data-science">Data Science & AI</option>
                                <option value="cloud-computing">Cloud Computing with AWS</option>
                            </select>
                        </div>

                        <div className={styles.group}>
                            <label className={styles.label} htmlFor="message">Message (Optional)</label>
                            <textarea
                                id="message"
                                name="message"
                                className={styles.textarea}
                                rows="3"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Tell us about your goals..."
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className={styles.submitBtn}
                            disabled={!isVerified}
                        >
                            Submit Application
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
