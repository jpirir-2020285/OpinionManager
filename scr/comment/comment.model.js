import { Schema, model } from "mongoose";

const commentSchema = Schema(
    {
        post: {
            type: Schema.Types.ObjectId,
            ref: 'Post',
            required: [true, 'Post is required']
        },
        content: {
            type: String,
            required: [true, 'Name is required'],
            maxLength: [1000, `Can't be overcome 1000 characters`]
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Keeper is required']
        },
        createdDate: {
            type: Date,
            default: Date.now
        },
        status: {
            type: Boolean,
            default: true
        }
    }
)

export default model('Comment', commentSchema)