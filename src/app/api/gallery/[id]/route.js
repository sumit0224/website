import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Gallery from '@/models/Gallery';

export async function GET(request, { params }) {
    await dbConnect();
    const { id } = await params;
    try {
        const galleryItem = await Gallery.findById(id);
        if (!galleryItem) {
            return NextResponse.json({ error: 'Gallery item not found' }, { status: 404 });
        }
        return NextResponse.json(galleryItem);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(request, { params }) {
    await dbConnect();
    const { id } = await params;
    try {
        const body = await request.json();
        const updatedGalleryItem = await Gallery.findByIdAndUpdate(
            id,
            body,
            { new: true, runValidators: true }
        );
        if (!updatedGalleryItem) {
            return NextResponse.json({ error: 'Gallery item not found' }, { status: 404 });
        }
        return NextResponse.json(updatedGalleryItem);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

export async function DELETE(request, { params }) {
    await dbConnect();
    const { id } = await params;
    try {
        const deletedGalleryItem = await Gallery.findByIdAndDelete(id);
        if (!deletedGalleryItem) {
            return NextResponse.json({ error: 'Gallery item not found' }, { status: 404 });
        }
        return NextResponse.json({ message: 'Gallery item deleted' });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

