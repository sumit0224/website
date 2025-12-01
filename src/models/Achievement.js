import mongoose from 'mongoose';

const AchievementSchema = new mongoose.Schema({
    title: { type: String, required: true },
    image: { type: String, required: true },
    order: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.Achievement || mongoose.model('Achievement', AchievementSchema);
