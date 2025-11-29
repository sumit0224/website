"use client";

import { useState } from 'react';
import { toast } from 'sonner';
import styles from './CareerCounseling.module.css';

export default function CareerCounseling() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    // OTP States
    const [otp, setOtp] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [sendingOtp, setSendingOtp] = useState(false);
    const [verifyingOtp, setVerifyingOtp] = useState(false);

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
            const res = await fetch('/api/counseling', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                toast.success('Request sent successfully! We will contact you soon.');
                setIsModalOpen(false);
                setFormData({ name: '', email: '', phone: '', message: '' });
                setIsVerified(false);
                setOtp('');
            } else {
                toast.error('Failed to send request. Please try again.');
            }
        } catch (error) {
            toast.error('Something went wrong. Please try again.');
        }
    };

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <h2 className={styles.title}>Confused about your career path?</h2>
                <p className={styles.description}>
                    Get expert guidance from our industry veterans. Book a free 1-on-1 counseling session
                    to discuss your career goals and find the perfect course for you.
                </p>
                <button
                    className={styles.ctaBtn}
                    onClick={() => setIsModalOpen(true)}
                >
                    Book Free Counseling
                </button>
            </div>

            {isModalOpen && (
                <div className={styles.modalOverlay} onClick={() => setIsModalOpen(false)}>
                    <div className={styles.modal} onClick={e => e.stopPropagation()}>
                        <button
                            className={styles.closeBtn}
                            onClick={() => setIsModalOpen(false)}
                        >
                            ×
                        </button>

                        <h3 className={styles.modalTitle}>Book Counseling Session</h3>
                        <p className={styles.modalSubtitle}>Fill in your details and we'll get back to you.</p>

                        <form className={styles.form} onSubmit={handleSubmit}>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Full Name</label>
                                <input
                                    type="text"
                                    className={styles.input}
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>Email Address</label>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <input
                                        type="email"
                                        className={styles.input}
                                        placeholder="john@example.com"
                                        value={formData.email}
                                        onChange={e => {
                                            setFormData({ ...formData, email: e.target.value });
                                            setIsVerified(false);
                                            setIsOtpSent(false);
                                            setOtp('');
                                        }}
                                        required
                                        disabled={isVerified}
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
                                <div className={styles.formGroup}>
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

                            <div className={styles.formGroup}>
                                <label className={styles.label}>Phone Number</label>
                                <input
                                    type="tel"
                                    className={styles.input}
                                    placeholder="+91 98765 43210"
                                    value={formData.phone}
                                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>Message (Optional)</label>
                                <textarea
                                    className={styles.textarea}
                                    placeholder="Any specific questions?"
                                    rows={3}
                                    value={formData.message}
                                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                                />
                            </div>

                            <button
                                type="submit"
                                className={styles.submitBtn}
                                disabled={!isVerified}
                                style={{ opacity: !isVerified ? 0.5 : 1, cursor: !isVerified ? 'not-allowed' : 'pointer' }}
                            >
                                Submit Request
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
}
