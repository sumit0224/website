import dbConnect from '@/lib/db';
import Alumni from '@/models/Alumni';
import { NextResponse } from 'next/server';

export async function GET() {
    await dbConnect();
    try {
        const alumni = await Alumni.find({}).sort({ createdAt: -1 });
        return NextResponse.json(alumni);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch alumni' }, { status: 500 });
    }
}

export async function POST(req) {
    await dbConnect();
    try {
        const body = await req.json();
        const alumni = await Alumni.create(body);
        return NextResponse.json(alumni, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create alumni' }, { status: 500 });
    }
}
