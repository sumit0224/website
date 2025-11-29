import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Gallery from '@/models/Gallery';

export async function GET() {
    await dbConnect();
    try {
        const gallery = await Gallery.find({}).sort({ createdAt: -1 });
        return NextResponse.json(gallery);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    await dbConnect();
    try {
        const body = await request.json();
        const galleryItem = await Gallery.create(body);
        return NextResponse.json(galleryItem, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
