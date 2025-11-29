import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: String, required: true },
    level: { type: String, required: true },
    image: { type: String, required: true },
    syllabus: { type: [String], required: true },
}, { timestamps: true });

export default mongoose.models.Course || mongoose.model('Course', CourseSchema);
