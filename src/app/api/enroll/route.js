
import { NextResponse } from 'next/server';
import transporter from '@/lib/email';
import dbConnect from '@/lib/db';
import Enrollment from '@/models/Enrollment';
import { z } from 'zod';

const enrollmentSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
    course: z.string().min(1, "Course selection is required"),
    message: z.string().optional(),
});

export async function POST(request) {
    await dbConnect();
    try {
        const body = await request.json();


        const validationResult = enrollmentSchema.safeParse(body);
        if (!validationResult.success) {
            return NextResponse.json(
                { message: 'Validation failed', errors: validationResult.error.flatten().fieldErrors },
                { status: 400 }
            );
        }

        const { name, email, phone, course, message } = validationResult.data;


        await Enrollment.create({ name, email, phone, course, message });




        const adminMailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: `New Enrollment Request: ${name} `,
            text: `
Name: ${name}
Email: ${email}
Phone: ${phone}
Course: ${course}
Message: ${message || 'N/A'}
`,
            html: `
        <h3>New Enrollment Request</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Course:</strong> ${course}</p>
        <p><strong>Message:</strong> ${message || 'N/A'}</p>
`,
        };


        const userMailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Enrollment Received - EduPrime',
            text: `Hi ${name},\n\nThank you for enrolling in our ${course} course. We have received your request and will get back to you shortly.\n\nBest Regards,\nEduPrime Team`,
            html: `
        <h3>Thank you for enrolling!</h3>
        <p>Hi ${name},</p>
        <p>We have received your request for the <strong>${course}</strong> course.</p>
        <p>Our team will review your application and contact you shortly.</p>
        <br>
        <p>Best Regards,</p>
        <p>EduPrime Team</p>
      `,
        };


        await transporter.sendMail(adminMailOptions);
        await transporter.sendMail(userMailOptions);

        return NextResponse.json({ message: 'Enrollment successful' }, { status: 200 });
    } catch (error) {
        console.error('Enrollment error:', error);
        return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
    }
}
