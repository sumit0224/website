import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Counseling from '@/models/Counseling';

export async function PUT(request, { params }) {
    await dbConnect();
    const { id } = await params;
    try {
        const body = await request.json();
        const updatedRequest = await Counseling.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
        });
        if (!updatedRequest) {
            return NextResponse.json({ error: 'Request not found' }, { status: 404 });
        }
        return NextResponse.json(updatedRequest);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    await dbConnect();
    const { id } = await params;
    try {
        const deletedRequest = await Counseling.findByIdAndDelete(id);
        if (!deletedRequest) {
            return NextResponse.json({ error: 'Request not found' }, { status: 404 });
        }
        return NextResponse.json({ message: 'Request deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
