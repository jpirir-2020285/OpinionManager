import { Schema, model } from "mongoose" 

const categorySchema = Schema(
    {
        name:{
            type: String,
            required: [true, 'Name is required'],
            maxLength: [25, `Can't be overcome 25 characters`],
            unique: true
        },
        description:{
            type: String,
            required: [true, 'Description is required'],
            maxLength: [200, `Can't be overcome 200 characters`]
        },
        status: {
            type: Boolean,
            required: [true, 'Description is required'],
            default: true
        }
    }
)
export default model("Category", categorySchema)