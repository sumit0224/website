import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: String, required: true },
    level: { type: String, required: true },
    image: { type: String, required: true },
    syllabus: [{
        title: { type: String, required: true },
        topics: [String]
    }],
    syllabusPdf: { type: String, required: false },
    actualPrice: { type: Number, required: false },
    discountedPrice: { type: Number, required: false },
}, { timestamps: true });

export default mongoose.models.Course || mongoose.model('Course', CourseSchema);
