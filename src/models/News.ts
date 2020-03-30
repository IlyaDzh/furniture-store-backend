import mongoose, { Schema, Document } from "mongoose";

export interface INews extends Document {
    image: string;
    title: string;
    short_description: string;
    description: Array<Object>;
}

const NewsSchema = new Schema(
    {
        image: {
            type: String,
            required: "Image is required"
        },
        title: {
            type: String,
            required: "Title is required"
        },
        short_description: String,
        description: [
            {
                type: {
                    type: String,
                    enum: ["Text", "Image"],
                    default: "Text"
                },
                content: {
                    type: String,
                    required: "Content is required"
                }
            }
        ]
    },
    {
        timestamps: true
    }
);

const NewsModel = mongoose.model<INews>("News", NewsSchema);

export default NewsModel;
