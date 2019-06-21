import mongoose, { Schema } from 'mongoose';

const travelSchema = new Schema({
    start_location: {
        type: String,
        required: true
    },
    end_location: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    users: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
);

export default mongoose.model('Travel', travelSchema);