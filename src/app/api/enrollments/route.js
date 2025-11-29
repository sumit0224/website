import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Enrollment from '@/models/Enrollment';

export async function GET() {
    await dbConnect();
    try {
        const enrollments = await Enrollment.find({}).sort({ createdAt: -1 });
        return NextResponse.json(enrollments);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
