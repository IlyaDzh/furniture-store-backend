import mongoose, { Schema, Document } from "mongoose";

export interface IComments extends Document {
    name: string;
    image: string;
    text: string;
    date: Date;
}

const CommentsSchema = new Schema(
    {
        name: {
            type: String,
            required: "Name is required"
        },
        image: String,
        text: {
            type: String,
            required: "Text is required"
        },
        date: {
            type: Date,
            default: new Date()
        }
    },
    {
        timestamps: true
    }
);

const CommentsModel = mongoose.model<IComments>("Comments", CommentsSchema);

export default CommentsModel;
