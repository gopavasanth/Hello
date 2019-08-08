import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 32
    },
    verified: {
        type: Boolean
    },
    imageUrl: {
        type: String
    },
    message:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Chat'
        }
    ],
    travelDetails:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Travel'
        }
    ]
    },{ timestamps: true }
)

export default mongoose.model('User', userSchema);