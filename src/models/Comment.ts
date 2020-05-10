import mongoose, { Schema, Document } from "mongoose";

export interface IComment extends Document {
    fullname: string;
    email: string;
    comment: string;
    date: Date;
}

const CommentSchema = new Schema(
    {
        fullname: {
            type: String,
            required: "Fullname is required"
        },
        email: {
            type: String,
            required: "Email is required"
        },
        comment: {
            type: String,
            required: "Comment is required"
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
