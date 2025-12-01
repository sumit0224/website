import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Otp from '@/models/Otp';

export async function POST(request) {
    await dbConnect();
    try {
        const { email, otp } = await request.json();

        if (!email || !otp) {
            return NextResponse.json({ error: 'Email and OTP are required' }, { status: 400 });
        }

        const validOtp = await Otp.findOne({ email, otp });

        if (!validOtp) {
            return NextResponse.json({ error: 'Invalid or expired OTP' }, { status: 400 });
        }




        return NextResponse.json({ message: 'Email verified successfully' });
    } catch (error) {
        console.error('OTP Verify Error:', error);
        return NextResponse.json({ error: 'Verification failed' }, { status: 500 });
    }
}
