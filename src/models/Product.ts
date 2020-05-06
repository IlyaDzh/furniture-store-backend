import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
    type: string;
    new: Boolean;
    hit: Boolean;
    name: string;
    images: Array<string>;
    chars: Object;
    price: Object;
}

const ProductSchema = new Schema(
    {
        type: {
            type: Schema.Types.ObjectId,
            ref: "Catalog",
            required: "Type is required"
        },
        new: {
            type: Boolean,
            default: false
        },
        hit: {
            type: Boolean,
            default: false
        },
        name: {
            type: String,
            required: "Name is required"
        },
        images: [String],
        chars: {
            shape: String,
            material: String,
            style: String,
            color: String,
            collection: String
        },
        price: {
            current: Number,
            old: Number,
            discount: Number,
            percent: Number
        }
    },
    {
        timestamps: true
    }
);

const ProductModel = mongoose.model<IProduct>("Product", ProductSchema);

export default ProductModel;
