import mongoose, { Schema } from 'mongoose';

const chatSchema = new Schema({
        message: {
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

export default mongoose.model('Chat', chatSchema);