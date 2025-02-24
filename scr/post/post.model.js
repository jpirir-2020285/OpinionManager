import { Schema, model } from "mongoose" 

const postSchema = Schema(
    {
        author:{
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'User is required']
        },
        title:{
            type: String,
            required: [true, 'Name is required'],
            maxLength: [25, `Can't be overcome 25 characters`]
        },
        content:{
            type: String,
            required: [true, 'Description is required'],
            maxLength: [400, `Can't be overcome 200 characters`]
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
            required: [true, 'Category is required']
        },
        status: {
            type: Boolean,
            default: true
        },
        createdDate: {
            type: Date,
            default: Date.now
        }
    }
)
export default model("Post", postSchema)