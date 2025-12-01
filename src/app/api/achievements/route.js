import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Achievement from '@/models/Achievement';

export async function GET() {
    await dbConnect();
    try {
        const achievements = await Achievement.find({}).sort({ order: 1 });
        return NextResponse.json(achievements);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    await dbConnect();
    try {
        const body = await request.json();
        const achievement = await Achievement.create(body);
        return NextResponse.json(achievement, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
