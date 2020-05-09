import mongoose, { Schema, Document } from "mongoose";

export interface ICatalog extends Document {
    title: string;
    path: string;
    categories: Array<Object>;
    products: Array<Object>;
}

const CatalogSchema = new Schema(
    {
        title: {
            type: String,
            required: "Title is required"
        },
        path: {
            type: String,
            required: "Path is required"
        },
        categories: [
            {
                title: {
                    type: String,
                    required: "Categories title is required"
                },
                content: [
                    {
                        type: String,
                        required: "Categories content is required"
                    }
                ]
            }
        ],
        products: [
            {
                type: Schema.Types.ObjectId,
                ref: "Product"
            }
        ]
    },
    {
        timestamps: true
    }
);

const CatalogModel = mongoose.model<ICatalog>("Catalog", CatalogSchema);

export default CatalogModel;
