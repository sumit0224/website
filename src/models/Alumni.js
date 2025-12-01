import mongoose from 'mongoose';

const AlumniSchema = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String, required: true },
    company: { type: String, required: true },
    image: { type: String },
}, { timestamps: true });

export default mongoose.models.Alumni || mongoose.model('Alumni', AlumniSchema);
