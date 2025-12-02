import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Otp from '@/models/Otp';
import transporter from '@/lib/email';

export async function POST(request) {
    await dbConnect();
    try {
        const { email } = await request.json();

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }


        const otp = Math.floor(100000 + Math.random() * 900000).toString();


        await Otp.findOneAndUpdate(
            { email },
            { otp, createdAt: Date.now() },
            { upsert: true, new: true }
        );


        await transporter.sendMail({
            from: `"Developer Mind School" <no-reply@dm3school.com>`,
            to: email,
            subject: 'Your Verification Code',
            html: `
                <h3>Email Verification</h3>
                <p>Your verification code is: <strong>${otp}</strong></p>
                <p>This code will expire in 5 minutes.</p>
            `
        });

        return NextResponse.json({ message: 'OTP sent successfully' });
    } catch (error) {
        console.error('OTP Send Error:', error);
        return NextResponse.json({ error: 'Failed to send OTP' }, { status: 500 });
    }
}
