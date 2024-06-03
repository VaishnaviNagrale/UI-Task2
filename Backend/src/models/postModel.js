import { Schema, model } from 'mongoose';

const PostSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    by: {
        type: String,
        required: true,
    },  
}, {
    timestamps: true,
});

export default model('Post', PostSchema);
