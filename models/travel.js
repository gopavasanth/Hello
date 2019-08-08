import mongoose, { Schema } from 'mongoose';

const travelSchema = new Schema({
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    fromlatitude: {
        type: String,
        required: true
    },
    fromlongitude: {
        type: String,
        required: true
    },
    // date: {
    //     type: Date,
    //     required: true
    // },
    // time: {
    //     type: String,
    //     required: true
    // },
    users: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
);

export default mongoose.model('Travel', travelSchema);