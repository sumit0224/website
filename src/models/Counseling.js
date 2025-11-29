import mongoose from 'mongoose';

const CounselingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
    },
    phone: {
        type: String,
        required: [true, 'Please provide a phone number'],
    },
    message: {
        type: String,
    },
    status: {
        type: String,
        enum: ['New', 'Contacted', 'Resolved'],
        default: 'New',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.Counseling || mongoose.model('Counseling', CounselingSchema);
