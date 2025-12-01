import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Achievement from '@/models/Achievement';

export async function DELETE(request, { params }) {
    await dbConnect();
    try {
        const { id } = params;
        const deletedAchievement = await Achievement.findByIdAndDelete(id);

        if (!deletedAchievement) {
            return NextResponse.json({ error: 'Achievement not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Achievement deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
