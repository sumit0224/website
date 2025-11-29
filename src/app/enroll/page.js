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

    // OTP States
    const [otp, setOtp] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [sendingOtp, setSendingOtp] = useState(false);
    const [verifyingOtp, setVerifyingOtp] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // Reset verification if email changes
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
                setIsOtpSent(false); // Hide OTP field after verification
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
            <h1 className={styles.title}>Enroll Now</h1>
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
                            disabled={isVerified} // Lock email after verification
                        />
                        {!isVerified && (
                            <button
                                type="button"
                                onClick={handleSendOtp}
                                disabled={sendingOtp || !formData.email}
                                style={{
                                    padding: '0 15px',
                                    backgroundColor: '#2563eb',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                {sendingOtp ? 'Sending...' : 'Verify'}
                            </button>
                        )}
                        {isVerified && (
                            <span style={{ color: 'green', alignSelf: 'center', fontWeight: 'bold' }}>✓ Verified</span>
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
                            />
                            <button
                                type="button"
                                onClick={handleVerifyOtp}
                                disabled={verifyingOtp}
                                style={{
                                    padding: '0 15px',
                                    backgroundColor: '#10b981',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer'
                                }}
                            >
                                {verifyingOtp ? 'Checking...' : 'Confirm'}
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
                        rows="4"
                        value={formData.message}
                        onChange={handleChange}
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className={styles.submitBtn}
                    disabled={!isVerified}
                    style={{ opacity: !isVerified ? 0.5 : 1, cursor: !isVerified ? 'not-allowed' : 'pointer' }}
                >
                    Submit Application
                </button>
            </form>
        </div>
    );
}
