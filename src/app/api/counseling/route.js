import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Counseling from '@/models/Counseling';
import transporter from '@/lib/email';

export async function GET() {
    await dbConnect();
    try {
        const requests = await Counseling.find({}).sort({ createdAt: -1 });
        return NextResponse.json(requests);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    await dbConnect();
    try {
        const body = await request.json();
        const newRequest = await Counseling.create(body);

        // Send Email to Admin
        try {
            await transporter.sendMail({
                from: '"Appwars Website" <no-reply@appwars.com>',
                to: 'admin@appwars.com', // Replace with admin email
                subject: 'New Career Counseling Request',
                html: `
                    <h3>New Counseling Request</h3>
                    <p><strong>Name:</strong> ${body.name}</p>
                    <p><strong>Email:</strong> ${body.email}</p>
                    <p><strong>Phone:</strong> ${body.phone}</p>
                    <p><strong>Message:</strong> ${body.message}</p>
                `
            });

            // Send Confirmation to User
            await transporter.sendMail({
                from: '"Developer Mind School" <no-reply@appwars.com>',
                to: body.email,
                subject: 'We received your counseling request',
                html: `
                    <h3>Hi ${body.name},</h3>
                    <p>Thank you for reaching out to Developer Mind School.</p>
                    <p>We have received your request for a free career counseling session. One of our experts will contact you shortly.</p>
                    <br>
                    <p>Best Regards,</p>
                    <p>Appwars Team</p>
                `
            });
        } catch (emailError) {
            console.error('Email sending failed:', emailError);
            // We don't fail the request if email fails, just log it
        }

        return NextResponse.json(newRequest, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
