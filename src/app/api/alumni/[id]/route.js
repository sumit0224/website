import dbConnect from '@/lib/db';
import Alumni from '@/models/Alumni';
import { NextResponse } from 'next/server';

export async function DELETE(req, { params }) {
    await dbConnect();
    try {
        const { id } = params;
        await Alumni.findByIdAndDelete(id);
        return NextResponse.json({ message: 'Alumni deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete alumni' }, { status: 500 });
    }
}
