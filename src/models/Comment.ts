import mongoose, { Schema, Document } from "mongoose";

export interface IComment extends Document {
    name: string;
    image: string;
    text: string;
    date: Date;
}

const CommentSchema = new Schema(
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

const CommentModel = mongoose.model<IComment>("Comment", CommentSchema);

export default CommentModel;
